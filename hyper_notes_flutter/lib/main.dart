import 'package:flutter/material.dart';
import 'package:hyper_notes_flutter/core/constants.dart';
import 'package:hyper_notes_flutter/pages/main_page.dart';
import 'package:hyper_notes_flutter/auth/login.dart';
import 'package:hyper_notes_flutter/auth/login_false-page.dart';
import 'package:hyper_notes_flutter/auth/register.dart';
import 'package:hyper_notes_flutter/auth/auth.dart';
import 'package:hyper_notes_flutter/pages/profile.dart' as profile;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'HyperNotes',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
        fontFamily: 'Poppins',
        scaffoldBackgroundColor: const Color.fromARGB(255, 200, 197, 200),
        appBarTheme: Theme.of(context).appBarTheme.copyWith(
              backgroundColor: const Color.fromARGB(255, 0, 0, 0),
              titleTextStyle: TextStyle(
                  color: Color(0xFF9B4DCC),
                  fontSize: 32,
                  fontFamily: 'Courier',
                  fontWeight: FontWeight.bold),
            ),
      ),
      home: MainPage(),
      routes: {
        '/home': (context) => MainPage(),
        '/profile': (context) => profile.UserProfilePage(),
        '/lfp': (context) => LoginFalsePage(),
        '/login': (context) => LoginPage(),
        '/register': (context) => RegisterPage(),
        '/auth': (context) => AuthPage(),
      },
    );
  }
}
