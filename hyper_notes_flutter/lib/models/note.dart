import 'package:cloud_firestore/cloud_firestore.dart';

class Note {
  final String id;
  final String text;
  final String date;
  final Map<String, dynamic>? content;
  final bool isRichText;

  Note({
    required this.id,
    required this.text,
    required this.date,
    this.content,
    this.isRichText = false,
  });

  factory Note.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    
    return Note(
      id: doc.id,
      text: data['text'] ?? '',
      date: data['date'] ?? '',
      content: data['content'],
      isRichText: data['isRichText'] ?? false,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'text': text,
      'date': date,
      'content': content,
      'isRichText': isRichText,
    };
  }
}