import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../models/note.dart';

class FirestoreService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // Get current user ID
  String? get userId => _auth.currentUser?.uid;

  // Reference to user's notes collection
  CollectionReference<Map<String, dynamic>>? get _notesRef {
    if (userId == null) return null;
    return _firestore.collection('users').doc(userId).collection('notes');
  }

  // Stream of notes for current user
  Stream<List<Note>> getNotesStream() {
    if (_notesRef == null) return Stream.value([]);
    
    return _notesRef!.snapshots().map((snapshot) =>
      snapshot.docs.map((doc) => Note.fromFirestore(doc)).toList()
    );
  }

  // Add a new note
  Future<void> addNote(String text) async {
    if (_notesRef == null) return;
    
    final date = DateTime.now().toLocal().toString().split(' ')[0];
    await _notesRef!.add({
      'text': text,
      'date': date,
    });
  }

  // Add a new rich note
  Future<void> addRichNote(String plainText, Map<String, dynamic> contentJson) async {
    if (_notesRef == null) return;
    
    final date = DateTime.now().toLocal().toString().split(' ')[0];
    await _notesRef!.add({
      'text': plainText,
      'date': date,
      'content': contentJson,
      'isRichText': true,
    });
  }

  // Delete a note
  Future<void> deleteNote(String noteId) async {
    if (_notesRef == null) return;
    await _notesRef!.doc(noteId).delete();
  }

  // Update a note
  Future<void> updateNote(String noteId, String text) async {
    if (_notesRef == null) return;
    
    await _notesRef!.doc(noteId).update({
      'text': text,
      'date': DateTime.now().toLocal().toString().split(' ')[0], // Update date
    });
  }

  // Update a rich note
  Future<void> updateRichNote(String noteId, String plainText, Map<String, dynamic> contentJson) async {
    if (_notesRef == null) return;
    
    await _notesRef!.doc(noteId).update({
      'text': plainText,
      'date': DateTime.now().toLocal().toString().split(' ')[0], // Update date
      'content': contentJson,
      'isRichText': true,
    });
  }
}