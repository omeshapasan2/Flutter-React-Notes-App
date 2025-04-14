import 'package:flutter/material.dart';
import '../screens/note_editor_screen.dart';

class NoteInput extends StatelessWidget {
  final Function(String) onSave;
  final bool isDarkMode;

  const NoteInput({
    Key? key,
    required this.onSave,
    required this.isDarkMode,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Instead of showing a simple text field in the bottom sheet,
    // we'll navigate to the rich text editor in fullscreen
    return Container(
      padding: const EdgeInsets.all(16),
      margin: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF67d7cc),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.2),
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
        border: const Border(
          bottom: BorderSide(
            color: Color(0xFF353434),
            width: 5,
          ),
        ),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Text(
            'Create a New Note',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              // Simple text note button
              ElevatedButton.icon(
                onPressed: () {
                  Navigator.pop(context);
                  _openSimpleNoteEditor(context);
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF353434),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(5),
                  ),
                  elevation: 2,
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 12,
                  ),
                ),
                icon: const Icon(Icons.note),
                label: const Text(
                  'Simple Note',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              
              // Rich text note button
              ElevatedButton.icon(
                onPressed: () {
                  Navigator.pop(context);
                  _openRichTextEditor(context);
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF353434),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(5),
                  ),
                  elevation: 2,
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 12,
                  ),
                ),
                icon: const Icon(Icons.text_format),
                label: const Text(
                  'Rich Text Note',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // Open a simple text editor (legacy version)
  void _openSimpleNoteEditor(BuildContext context) {
    showDialog(
      context: context,
      builder: (_) => SimpleNoteDialog(onSave: onSave),
    );
  }

  // Open the rich text editor in full screen
  void _openRichTextEditor(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => NoteEditorScreen(
          noteId: 'new', // This will be replaced when saving
          isNewNote: true,
        ),
      ),
    );
  }
}

// A simple dialog for creating plain text notes (legacy support)
class SimpleNoteDialog extends StatefulWidget {
  final Function(String) onSave;

  const SimpleNoteDialog({Key? key, required this.onSave}) : super(key: key);

  @override
  _SimpleNoteDialogState createState() => _SimpleNoteDialogState();
}

class _SimpleNoteDialogState extends State<SimpleNoteDialog> {
  final TextEditingController _textController = TextEditingController();

  @override
  void dispose() {
    _textController.dispose();
    super.dispose();
  }

  void _handleSave() {
    final text = _textController.text.trim();
    if (text.isNotEmpty) {
      widget.onSave(text);
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
      ),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: const Color(0xFFfef68a),
          borderRadius: BorderRadius.circular(20),
          border: const Border(
            bottom: BorderSide(
              color: Color(0xFF353434),
              width: 5,
            ),
          ),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              'Create Simple Note',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _textController,
              decoration: const InputDecoration(
                hintText: 'Type your note here...',
                hintStyle: TextStyle(color: Colors.black54),
                border: InputBorder.none,
              ),
              style: const TextStyle(
                color: Colors.black,
                fontSize: 18,
              ),
              maxLines: 8,
              minLines: 5,
              autofocus: true,
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('CANCEL'),
                ),
                ElevatedButton(
                  onPressed: _handleSave,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF353434),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(5),
                    ),
                  ),
                  child: const Text('SAVE'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}