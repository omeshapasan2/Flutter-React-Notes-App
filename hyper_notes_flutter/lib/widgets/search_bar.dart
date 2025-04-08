import 'package:flutter/material.dart';

class NoteSearchBar extends StatefulWidget {
  final Function(String) onSearch;

  const NoteSearchBar({
    Key? key,
    required this.onSearch,
  }) : super(key: key);

  @override
  State<NoteSearchBar> createState() => _NoteSearchBarState();
}

class _NoteSearchBarState extends State<NoteSearchBar> {
  final TextEditingController _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDarkMode = Theme.of(context).brightness == Brightness.dark;
    
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: isDarkMode ? const Color(0xFF2A2A2A) : Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 4,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          Icon(
            Icons.search,
            color: isDarkMode ? Colors.white70 : Colors.black54,
          ),
          const SizedBox(width: 8),
          Expanded(
            child: TextField(
  controller: _controller,
  decoration: InputDecoration(
    hintText: 'Search notes...',
    hintStyle: TextStyle(
      fontFamily: 'Courier',  // Set the font family for hint text
      fontWeight: FontWeight.bold,  // Set the font weight for hint text
      color: isDarkMode ? Colors.white54 : Colors.black38,
    ),
    border: InputBorder.none,
  ),
  style: TextStyle(
    fontFamily: 'Courier',  // Set the font family for the input text
    fontWeight: FontWeight.bold,  // Set the font weight for the input text
    color: isDarkMode ? Colors.white : Colors.black,
  ),
  onChanged: widget.onSearch,
),

          ),
          if (_controller.text.isNotEmpty)
            IconButton(
              icon: Icon(
                Icons.clear,
                color: isDarkMode ? Colors.white70 : Colors.black54,
              ),
              onPressed: () {
                _controller.clear();
                widget.onSearch('');
              },
            ),
        ],
      ),
    );
  }
}