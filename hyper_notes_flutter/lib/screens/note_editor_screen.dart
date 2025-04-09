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
  bool _isEdited = false;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.initialText);
    _controller.addListener(() {
      if (_controller.text != widget.initialText && !_isEdited) {
        setState(() {
          _isEdited = true;
        });
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 0, 0, 0),
        foregroundColor: Colors.white,
        elevation: 0,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(
            bottom: Radius.circular(20),
          ),
        ),
        title: const Text(
          'Edit Note',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            fontFamily: 'Courier',
            color: Color(0xFF67d7cc),
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(
              Icons.save,
              color: const Color(0xFF67d7cc),
            ),
            onPressed: () async {
              if (_controller.text.trim().isNotEmpty) {
                await _firestoreService.updateNote(
                  widget.noteId,
                  _controller.text,
                );
                if (context.mounted) {
                  Navigator.pop(context);
                }
              }
            },
          ),
        ],
        toolbarHeight: 70,
      ),
      body: Container(
        color: isDarkMode 
            ? const Color.fromARGB(255, 0, 0, 0) 
            : const Color.fromARGB(255, 201, 197, 197),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Container(
            decoration: BoxDecoration(
              color: const Color(0xFFfef68a),
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.2),
                  blurRadius: 8,
                  offset: const Offset(0, 4),
                ),
              ],
              border: const Border(
                bottom: BorderSide(
                  color: Color(0xFF353434),
                  width: 5,
                ),
              ),
            ),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: TextField(
                controller: _controller,
                maxLines: null,
                expands: true,
                style: const TextStyle(
                  color: Colors.black,
                  fontSize: 18,
                ),
                decoration: const InputDecoration(
                  border: InputBorder.none,
                  hintText: 'Enter your note here...',
                  hintStyle: TextStyle(
                    color: Colors.black54,
                  ),
                ),
                autofocus: true,
              ),
            ),
          ),
        ),
      ),
      floatingActionButton: _isEdited ? FloatingActionButton(
        backgroundColor: const Color(0xFF67d7cc),
        foregroundColor: Colors.black,
        elevation: 8,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15),
          side: const BorderSide(color: Color(0xFF353434), width: 2),
        ),
        child: const Icon(Icons.save),
        onPressed: () async {
          if (_controller.text.trim().isNotEmpty) {
            await _firestoreService.updateNote(
              widget.noteId,
              _controller.text,
            );
            if (context.mounted) {
              Navigator.pop(context);
            }
          }
        },
      ) : null,
    );
  }
}