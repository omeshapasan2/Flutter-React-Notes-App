import 'package:cloud_firestore/cloud_firestore.dart';

class Note {
  final String id;
  final String text;
  final String date;

  Note({
    required this.id,
    required this.text, 
    required this.date
  });

  factory Note.fromFirestore(DocumentSnapshot doc) {
    Map data = doc.data() as Map<String, dynamic>;
    return Note(
      id: doc.id,
      text: data['text'] ?? '',
      date: data['date'] ?? '',
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'text': text,
      'date': date,
    };
  }
}