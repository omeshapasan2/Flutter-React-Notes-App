import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:flutter_quill_extensions/flutter_quill_extensions.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:convert';
import 'dart:io';
import '../services/firestore_service.dart';

class NoteEditorScreen extends StatefulWidget {
  final String noteId;
  final String initialText;
  final Map<String, dynamic>? initialContent;
  final bool isNewNote;

  const NoteEditorScreen({
    Key? key,
    required this.noteId,
    this.initialText = '',
    this.initialContent,
    this.isNewNote = false,
  }) : super(key: key);

  @override
  _NoteEditorScreenState createState() => _NoteEditorScreenState();
}

class _NoteEditorScreenState extends State<NoteEditorScreen> {
  late QuillController _controller;
  final FirestoreService _firestoreService = FirestoreService();
  bool _isEdited = false;
  final FocusNode _focusNode = FocusNode();

  @override
  void initState() {
    super.initState();
    
    // Initialize with rich content if available, otherwise use plain text
    if (widget.initialContent != null) {
      try {
        List<dynamic> deltaContent;

        if (widget.initialContent!.containsKey('delta')) {
          deltaContent = widget.initialContent!['delta'] as List<dynamic>;
        } else {
          // If directly passed as a list (unlikely but handling just in case)
          deltaContent = widget.initialContent! as List<dynamic>;
        }
          
      _controller = QuillController(
        document: Document.fromJson(deltaContent),
        selection: const TextSelection.collapsed(offset: 0),
        );
      } catch (e) {
        // Fallback to plain text if JSON parsing fails
        _controller = QuillController.basic();
        _controller.document.insert(0, widget.initialText);
      }
    } else {
      _controller = QuillController.basic();
      _controller.document.insert(0, widget.initialText);
    }

    _controller.addListener(() {
      if (!_isEdited) {
        setState(() {
          _isEdited = true;
        });
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  Future<void> _saveNote() async {
    // Convert the document to a JSON representation
    final delta = _controller.document.toDelta().toJson();
    
    final contentJson = {
      'delta': delta
    };

    final plainText = _controller.document.toPlainText();
    
    if (plainText.trim().isNotEmpty) {
      if (widget.isNewNote) {
        await _firestoreService.addRichNote(plainText, contentJson);
      } else {
        await _firestoreService.updateRichNote(
          widget.noteId,
          plainText,
          contentJson,
        );
      }
      
      if (context.mounted) {
        Navigator.pop(context);
      }
    }
  }

  Future<void> _insertImage() async {
    final ImagePicker picker = ImagePicker();
    final XFile? image = await picker.pickImage(source: ImageSource.gallery);
    
    if (image != null) {
      final bytes = await image.readAsBytes();
      final base64Image = base64Encode(bytes);
      final imageUrl = 'data:image/jpeg;base64,$base64Image';
      
      // Insert the image at the current cursor position
      final index = _controller.selection.baseOffset;
      final length = _controller.selection.extentOffset - index;
      
      _controller.replaceText(
        index, 
        length, 
        BlockEmbed.image(imageUrl), 
        null
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    
    // Create the toolbar with formatting options
    final quillToolbar = QuillSimpleToolbar(
      controller: _controller,

      config: QuillSimpleToolbarConfig(

        // You can include additional configuration options if required.

        customButtons: [

          QuillToolbarCustomButtonOptions(

            icon: const Icon(Icons.image),

            tooltip: 'Insert Image',

            onPressed: _insertImage,

          ),

        ],

      ),
    );

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
            icon: const Icon(
              Icons.save,
              color: Color(0xFF67d7cc),
            ),
            onPressed: _saveNote,
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
            child: Column(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8),
                  decoration: BoxDecoration(
                    color: const Color(0xFFfef68a).withOpacity(0.9),
                    border: const Border(
                      bottom: BorderSide(color: Colors.black12),
                    ),
                    borderRadius: const BorderRadius.vertical(
                      top: Radius.circular(20),
                    ),
                  ),
                  child: quillToolbar,
                ),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    child: QuillEditor.basic(
                      controller: _controller,

                      config: const QuillEditorConfig(

                        placeholder: 'Enter your note here...',

                        // Additional properties can be set on this config if needed.

                      ),
                    ),
                  ),
                ),
              ],
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
        onPressed: _saveNote,
      ) : null,
    );
  }
}