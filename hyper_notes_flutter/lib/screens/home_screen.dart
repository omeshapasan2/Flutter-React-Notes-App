import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import 'login_screen.dart';
import '../services/firestore_service.dart';
import '../models/note.dart';
import '../widgets/note_grid.dart';
import '../widgets/note_input.dart';
import '../widgets/search_bar.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final AuthService _authService = AuthService();
  final FirestoreService _firestoreService = FirestoreService();
  String _searchText = '';
  bool _isDarkMode = true;

  // Define theme colors
  late ThemeData _theme;

  @override
  void initState() {
    super.initState();
    _updateTheme();
  }

  void _updateTheme() {
    _theme = _isDarkMode
        ? ThemeData.dark().copyWith(
            primaryColor: const Color(0xFF353434),
            scaffoldBackgroundColor: const Color.fromARGB(255, 0, 0, 0),
            colorScheme: ColorScheme.dark(
              primary: const Color(0xFF67d7cc),
              secondary: const Color(0xFFfef68a),
              surface: const Color(0xFF353434),
            ),
          )
        : ThemeData.light().copyWith(
            primaryColor: const Color(0xFF353434),
            scaffoldBackgroundColor: const Color.fromARGB(255, 201, 197, 197),
            colorScheme: ColorScheme.light(
              primary: const Color(0xFF67d7cc),
              secondary: const Color(0xFFfef68a),
              surface: Colors.white,
            ),
          );
  }

  @override
  Widget build(BuildContext context) {
    return Theme(
      data: _theme,
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: const Color.fromARGB(255, 0, 0, 0),
          foregroundColor: Colors.white,
          elevation: 0,
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.vertical(
              bottom: Radius.circular(20),
            ),
          ),
          title: Padding(
            padding: const EdgeInsets.only(bottom: 8.0),  // Adds space below the title
            child: const Text(
              'HyperNotes',
              style: TextStyle(
                fontSize: 32,
                fontWeight: FontWeight.bold,
                fontFamily: 'Courier',
                color: Color(0xFF67d7cc),
              ),
            ),
          ),
          actions: [
            IconButton(
              icon: Icon(_isDarkMode ? Icons.light_mode : Icons.dark_mode),
              onPressed: () {
                setState(() {
                  _isDarkMode = !_isDarkMode;
                  _updateTheme();
                });
              },
            ),
            IconButton(
              icon: const Icon(Icons.logout),
              onPressed: () async {
                await _authService.signOut();
                if (context.mounted) {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(builder: (context) => LoginScreen()),
                  );
                }
              },
            ),
          ],
          toolbarHeight: 70,  // Increases the height of the AppBar
        ),

        body: Container(
          color: _theme.scaffoldBackgroundColor,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 15),
            child: Column(
              children: [
                const SizedBox(height: 16),
                // Search bar styling
                Container(
                  margin: const EdgeInsets.only(bottom: 16),
                  decoration: BoxDecoration(
                    color: _isDarkMode ? const Color(0xFF353434) : Colors.white,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.1),
                        blurRadius: 8,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: NoteSearchBar(
                    onSearch: (value) {
                      setState(() {
                        _searchText = value;
                      });
                    },
                  ),
                ),
                Expanded(
                  child: StreamBuilder<List<Note>>(
                    stream: _firestoreService.getNotesStream(),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting) {
                        return const Center(child: CircularProgressIndicator());
                      }

                      if (snapshot.hasError) {
                        return Center(child: Text('Error: ${snapshot.error}'));
                      }

                      final notes = snapshot.data ?? [];
                      
                      // Filter notes based on search text
                      final filteredNotes = _searchText.isEmpty
                          ? notes
                          : notes.where((note) => 
                              note.text.toLowerCase().contains(_searchText.toLowerCase())
                            ).toList();

                      return NoteGrid(
                        notes: filteredNotes,
                        onDeleteNote: _firestoreService.deleteNote,
                        isDarkMode: _isDarkMode,
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
        floatingActionButton: FloatingActionButton(
          backgroundColor: const Color(0xFF67d7cc),
          foregroundColor: Colors.black,
          elevation: 8,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
            side: const BorderSide(color: Color(0xFF353434), width: 2),
          ),
          child: const Icon(Icons.add),
          onPressed: () {
            showModalBottomSheet(
              context: context,
              isScrollControlled: true,
              backgroundColor: Colors.transparent,
              builder: (context) => Container(
                padding: EdgeInsets.only(
                  bottom: MediaQuery.of(context).viewInsets.bottom,
                ),
                decoration: const BoxDecoration(
                  color: Colors.transparent,
                ),
                child: NoteInput(
                  onSave: _firestoreService.addNote,
                  isDarkMode: _isDarkMode,
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}