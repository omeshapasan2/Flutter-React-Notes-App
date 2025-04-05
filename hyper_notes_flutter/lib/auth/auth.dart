import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'login.dart';
import 'login_false-page.dart';
import 'package:hyper_notes_flutter/pages/main_page.dart';
import 'package:hyper_notes_flutter/pages/profile.dart';

class AuthPage extends StatelessWidget {
  const AuthPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      //Tells whether the user is logged in or not
      body: StreamBuilder(
          stream: FirebaseAuth.instance.authStateChanges(),
          //If the user is logged in, show the profile page
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return const UserProfilePage();
            } else {
              return const LoginFalsePage();
            }
          }),
    );
  }
}
