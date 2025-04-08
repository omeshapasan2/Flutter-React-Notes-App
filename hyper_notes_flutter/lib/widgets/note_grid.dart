import 'package:flutter/material.dart';
import '../models/note.dart';
import 'note_card.dart';

class NoteGrid extends StatelessWidget {
  final List<Note> notes;
  final Function(String) onDeleteNote;
  final bool isDarkMode;

  const NoteGrid({
    Key? key,
    required this.notes,
    required this.onDeleteNote,
    required this.isDarkMode,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      padding: const EdgeInsets.only(top: 16, bottom: 80),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
        childAspectRatio: 1,
      ),
      itemCount: notes.length,
      itemBuilder: (context, index) {
        final note = notes[index];
        return NoteCard(
          note: note,
          onDelete: () => onDeleteNote(note.id),
          isDarkMode: isDarkMode,
        );
      },
    );
  }
}