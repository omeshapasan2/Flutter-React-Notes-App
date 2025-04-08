import 'package:flutter/material.dart';
import '../services/firestore_service.dart';

class NoteEditorScreen extends StatefulWidget {
  final String noteId;
  final String initialText;

  const NoteEditorScreen({
    Key? key,
    required this.noteId,
    required this.initialText,
  }) : super(key: key);

  @override
  _NoteEditorScreenState createState() => _NoteEditorScreenState();
}

class _NoteEditorScreenState extends State<NoteEditorScreen> {
  late TextEditingController _controller;
  final FirestoreService _firestoreService = FirestoreService();

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.initialText);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Edit Note'),
        actions: [
          IconButton(
            icon: Icon(Icons.save),
            onPressed: () async {
              if (_controller.text.trim().isNotEmpty) {
                await _firestoreService.updateNote(
                  widget.noteId,
                  _controller.text,
                );
                Navigator.pop(context);
              }
            },
          ),
        ],
      ),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: TextField(
          controller: _controller,
          maxLines: null, // Expands to fill available space
          decoration: InputDecoration(
            border: InputBorder.none,
            hintText: 'Enter your note here...',
          ),
          autofocus: true,
        ),
      ),
    );
  }
}