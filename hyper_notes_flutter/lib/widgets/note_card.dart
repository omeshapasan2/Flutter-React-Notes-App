import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../models/note.dart';
import '../screens/note_editor_screen.dart';

class NoteCard extends StatelessWidget {
  final Note note;
  final VoidCallback onDelete;
  final bool isDarkMode;

  const NoteCard({
    Key? key,
    required this.note,
    required this.onDelete,
    required this.isDarkMode,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        // Open note editor when tapped (restored from old version)
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => NoteEditorScreen(noteId: note.id, initialText: note.text),
          ),
        );
      },
      borderRadius: BorderRadius.circular(20),
      child: Container(
        decoration: BoxDecoration(
          color: const Color(0xFFfef68a),
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 4,
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
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Text(
                  note.text,
                  style: const TextStyle(
                    color: Colors.black,
                    fontSize: 16,
                  ),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 6, // Restored from old version
                ),
              ),
              const SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    note.date,
                    style: TextStyle(
                      color: Colors.black.withOpacity(0.7),
                      fontSize: 12,
                    ),
                  ),
                  Row(
                    children: [
                      // Copy button (restored from old version)
                      InkWell(
                        onTap: () {
                          Clipboard.setData(ClipboardData(text: note.text));
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(content: Text('Note copied to clipboard')),
                          );
                        },
                        child: const Padding(
                          padding: EdgeInsets.all(8.0),
                          child: Icon(
                            Icons.copy,
                            color: Colors.black,
                            size: 20,
                          ),
                        ),
                      ),
                      const SizedBox(width: 4),
                      // Delete button with confirmation dialog (restored from old version)
                      InkWell(
                        onTap: () {
                          // Show confirmation dialog before deleting
                          showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: const Text('Delete Note'),
                              content: const Text('Are you sure you want to delete this note?'),
                              actions: [
                                TextButton(
                                  child: const Text('Cancel'),
                                  onPressed: () => Navigator.pop(context),
                                ),
                                TextButton(
                                  child: const Text('Delete'),
                                  onPressed: () {
                                    onDelete();
                                    Navigator.pop(context);
                                  },
                                ),
                              ],
                            ),
                          );
                        },
                        child: const Padding(
                          padding: EdgeInsets.all(8.0),
                          child: Icon(
                            Icons.delete,
                            color: Colors.black,
                            size: 20,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}