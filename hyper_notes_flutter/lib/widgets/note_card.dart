import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_quill/flutter_quill.dart';
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
    // For rich text preview
    QuillController? previewController;
    
    if (note.isRichText && note.content != null) {
      try {
        final contentDelta = note.content!['delta'] as List<dynamic>;

        previewController = QuillController(
          document: Document.fromJson(contentDelta),
          selection: const TextSelection.collapsed(offset: 0),
        );
      } catch (e) {
        // If parsing fails, we'll fall back to plain text
        previewController = null;
      }
    }

    return InkWell(
      onTap: () {
        // Navigate to the editor with appropriate data
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => NoteEditorScreen(
              noteId: note.id, 
              initialText: note.text,
              initialContent: note.content,
            ),
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
                child: note.isRichText && previewController != null
                    ? QuillEditor(
                        controller: previewController,
                        scrollController: ScrollController(),
                        // scrollable: true,
                        focusNode: FocusNode(),
                        // autoFocus: false,
                        // readOnly: true,
                        // expands: false,
                        // padding: EdgeInsets.zero,
                      )
                    : Text(
                        note.text,
                        style: const TextStyle(
                          color: Colors.black,
                          fontSize: 16,
                        ),
                        overflow: TextOverflow.ellipsis,
                        maxLines: 6,
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
                      // Copy button
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
                      // Delete button with confirmation dialog
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