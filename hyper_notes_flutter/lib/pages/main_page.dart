import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:hyper_notes_flutter/core/constants.dart';

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  final List<String> dropdownOptions = [
    'Date Modified',
    'Date Created',
  ];

  late String dropdownValue = dropdownOptions.first;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('HyperNotes'),
        actions: [
          IconButton(
            onPressed: () {},
            icon: FaIcon(FontAwesomeIcons.rightFromBracket),
            style: IconButton.styleFrom(
                backgroundColor: const Color.fromARGB(255, 0, 0, 0),
                foregroundColor: const Color.fromARGB(255, 255, 255, 255),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                    side: BorderSide(color: white))),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.large(
        onPressed: () {},
        child: FaIcon(FontAwesomeIcons.plus),
      ),
      body: Column(
        children: [
          TextField(
            decoration: InputDecoration(
              hintText: 'Search Notes',
              hintStyle: TextStyle(fontSize: 12),
              prefixIcon: Icon(FontAwesomeIcons.magnifyingGlass),
              fillColor: const Color.fromARGB(255, 0, 0, 0),
              filled: true,
              isDense: true,
              contentPadding: EdgeInsets.zero,
              prefixIconConstraints:
                  BoxConstraints(minWidth: 42, minHeight: 42),
              enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                  borderSide: BorderSide(color: white)),
              focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                  borderSide: BorderSide(color: white)),
            ),
          ),
          Row(
            children: [
              IconButton(
                  onPressed: () {}, icon: FaIcon(FontAwesomeIcons.arrowDown)),
              DropdownButton<String>(
                value: dropdownValue,
                items: dropdownOptions
                    .map((e) => DropdownMenuItem(
                          value: e,
                          child: Text(e),
                        ))
                    .toList(),
                onChanged: (newValue) {
                  setState(() {
                    dropdownValue = newValue!;
                  });
                },
              ),
              Spacer(),
              IconButton(onPressed: () {}, icon: FaIcon(FontAwesomeIcons.bars)),
            ],
          ),
          Expanded(
            child: GridView.builder(
              itemCount: 15,
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2, crossAxisSpacing: 4, mainAxisSpacing: 4),
              itemBuilder: (context, int index) {
                return Container(
                  child: Column(
                    children: [
                      Text('This is going to be a title'),
                      Row(
                        children: [
                          Container(
                            child: Text('First chip'),
                          ),
                        ],
                      ),
                      Text('Some content'),
                      Row(
                        children: [
                          Text('10 01 2023'),
                          FaIcon(FontAwesomeIcons.trashCan),
                        ],
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
