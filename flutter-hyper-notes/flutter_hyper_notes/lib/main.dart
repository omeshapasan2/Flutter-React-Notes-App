// main.dart
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:uuid/uuid.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Hyper Notes',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      darkTheme: ThemeData.dark(),
      home: LoginPage(),
    );
  }
}

class User {
  final String username;
  final String password;

  User({required this.username, required this.password});

  Map<String, dynamic> toMap() {
    return {
      'username': username,
      'password': password,
    };
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      username: map['username'] ?? '',
      password: map['password'] ?? '',
    );
  }
}

class Note {
  final String id;
  final String text;
  final String date;

  Note({required this.id, required this.text, required this.date});

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'text': text,
      'date': date,
    };
  }

  factory Note.fromMap(Map<String, dynamic> map) {
    return Note(
      id: map['id'] ?? '',
      text: map['text'] ?? '',
      date: map['date'] ?? '',
    );
  }
}

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  bool isRegistering = false;
  String errorMessage = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(isRegistering ? 'Register' : 'Login'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: usernameController,
              decoration: InputDecoration(
                labelText: 'Username',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 16),
            TextField(
              controller: passwordController,
              obscureText: true,
              decoration: InputDecoration(
                labelText: 'Password',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 8),
            if (errorMessage.isNotEmpty)
              Text(
                errorMessage,
                style: TextStyle(color: Colors.red),
              ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: isRegistering ? _register : _login,
              child: Text(isRegistering ? 'Register' : 'Login'),
            ),
            TextButton(
              onPressed: () {
                setState(() {
                  isRegistering = !isRegistering;
                  errorMessage = '';
                });
              },
              child: Text(isRegistering
                  ? 'Already have an account? Login'
                  : 'No account? Register'),
            ),
          ],
        ),
      ),
    );
  }

  void _login() async {
    final prefs = await SharedPreferences.getInstance();
    final String? usersJson = prefs.getString('flutter-notes-users');

    if (usersJson != null) {
      final List<dynamic> decodedUsers = jsonDecode(usersJson);
      final List<User> users =
          decodedUsers.map((user) => User.fromMap(user)).toList();

      final user = users.firstWhere(
        (user) =>
            user.username == usernameController.text &&
            user.password == passwordController.text,
        orElse: () => User(username: '', password: ''),
      );

      if (user.username.isNotEmpty) {
        // Login successful
        await prefs.setString('current-user', usernameController.text);
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => NotesPage(username: usernameController.text),
          ),
        );
      } else {
        setState(() {
          errorMessage = 'Invalid username or password';
        });
      }
    } else {
      setState(() {
        errorMessage = 'No users found. Please register first.';
      });
    }
  }

  void _register() async {
    if (usernameController.text.isEmpty || passwordController.text.isEmpty) {
      setState(() {
        errorMessage = 'Username and password cannot be empty';
      });
      return;
    }

    final prefs = await SharedPreferences.getInstance();
    final String? usersJson = prefs.getString('flutter-notes-users');

    List<User> users = [];
    if (usersJson != null) {
      final List<dynamic> decodedUsers = jsonDecode(usersJson);
      users = decodedUsers.map((user) => User.fromMap(user)).toList();

      // Check if username already exists
      if (users.any((user) => user.username == usernameController.text)) {
        setState(() {
          errorMessage = 'Username already exists';
        });
        return;
      }
    }

    // Add new user
    users.add(User(
      username: usernameController.text,
      password: passwordController.text,
    ));

    // Save users
    final List<Map<String, dynamic>> usersMap =
        users.map((user) => user.toMap()).toList();
    await prefs.setString('flutter-notes-users', jsonEncode(usersMap));

    // Create initial note for new user
    final List<Note> initialNotes = [
      Note(
        id: const Uuid().v4(),
        text:
            "Welcome to Hyper Notes! \n       This is a sample note. \n\n✅ You can add, delete, and copy notes. \n😎Enjoy your note-taking experience!",
        date: DateTime.now().toLocal().toString().split(' ')[0],
      )
    ];

    final List<Map<String, dynamic>> notesMap =
        initialNotes.map((note) => note.toMap()).toList();
    await prefs.setString(
      'flutter-notes-${usernameController.text}',
      jsonEncode(notesMap),
    );

    // Set current user
    await prefs.setString('current-user', usernameController.text);

    // Navigate to notes page
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(
        builder: (context) => NotesPage(username: usernameController.text),
      ),
    );
  }
}

class NotesPage extends StatefulWidget {
  final String username;

  NotesPage({required this.username});

  @override
  _NotesPageState createState() => _NotesPageState();
}

class _NotesPageState extends State<NotesPage> {
  List<Note> notes = [];
  String searchText = "";
  bool darkMode = false;
  final TextEditingController searchController = TextEditingController();
  final TextEditingController noteController = TextEditingController();

  @override
  void initState() {
    super.initState();
    loadNotes();
  }

  Future<void> loadNotes() async {
    final prefs = await SharedPreferences.getInstance();
    final String? notesJson =
        prefs.getString('flutter-notes-${widget.username}');
    if (notesJson != null) {
      final List<dynamic> decodedNotes = jsonDecode(notesJson);
      setState(() {
        notes = decodedNotes.map((note) => Note.fromMap(note)).toList();
      });
    }
  }

  void saveNotes() async {
    final prefs = await SharedPreferences.getInstance();
    final List<Map<String, dynamic>> notesMap =
        notes.map((note) => note.toMap()).toList();
    await prefs.setString(
      'flutter-notes-${widget.username}',
      jsonEncode(notesMap),
    );
  }

  void addNote() {
    if (noteController.text.isEmpty) return;

    final String date = DateTime.now().toLocal().toString().split(' ')[0];
    final String id = const Uuid().v4();

    setState(() {
      notes.add(Note(
        id: id,
        text: noteController.text,
        date: date,
      ));
    });

    noteController.clear();
    saveNotes();
  }

  void deleteNote(String id) {
    setState(() {
      notes.removeWhere((note) => note.id == id);
    });
    saveNotes();

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Note deleted'),
        duration: Duration(seconds: 2),
      ),
    );
  }

  void copyNote(String text) {
    Clipboard.setData(ClipboardData(text: text));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Note copied to clipboard!'),
        duration: Duration(seconds: 2),
      ),
    );
  }

  void logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('current-user');
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => LoginPage()),
    );
  }

  List<Note> getFilteredNotes() {
    return notes
        .where((note) =>
            note.text.toLowerCase().contains(searchText.toLowerCase()))
        .toList();
  }

  @override
  Widget build(BuildContext context) {
    final filteredNotes = getFilteredNotes();

    return Scaffold(
      appBar: AppBar(
        title: Text('Hyper Notes - ${widget.username}'),
        actions: [
          IconButton(
            icon: Icon(darkMode ? Icons.light_mode : Icons.dark_mode),
            onPressed: () {
              setState(() {
                darkMode = !darkMode;
              });
            },
          ),
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: logout,
          ),
        ],
      ),
      body: Column(
        children: [
          // Search Box
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              controller: searchController,
              decoration: InputDecoration(
                labelText: 'Search notes',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(),
              ),
              onChanged: (value) {
                setState(() {
                  searchText = value;
                });
              },
            ),
          ),

          // Notes List
          Expanded(
            child: filteredNotes.isEmpty
                ? Center(child: Text('No notes found'))
                : ListView.builder(
                    itemCount: filteredNotes.length,
                    itemBuilder: (context, index) {
                      final note = filteredNotes[index];
                      return Card(
                        margin: EdgeInsets.all(8),
                        child: ListTile(
                          title: Text(note.text),
                          subtitle: Text(note.date),
                          trailing: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              IconButton(
                                icon: Icon(Icons.copy),
                                onPressed: () => copyNote(note.text),
                              ),
                              IconButton(
                                icon: Icon(Icons.delete),
                                onPressed: () => deleteNote(note.id),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showDialog(
            context: context,
            builder: (context) => AlertDialog(
              title: Text('Add New Note'),
              content: TextField(
                controller: noteController,
                maxLines: 5,
                decoration: InputDecoration(
                  hintText: 'Enter your note...',
                ),
              ),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  child: Text('Cancel'),
                ),
                TextButton(
                  onPressed: () {
                    addNote();
                    Navigator.pop(context);
                  },
                  child: Text('Add'),
                ),
              ],
            ),
          );
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
