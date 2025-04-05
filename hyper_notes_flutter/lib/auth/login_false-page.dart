import 'package:flutter/material.dart';

class LoginFalsePage extends StatefulWidget {
  const LoginFalsePage({super.key});

  @override
  State<LoginFalsePage> createState() => _LoginFalsePageState();
}

class _LoginFalsePageState extends State<LoginFalsePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.white),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Image.asset('assets/logo.png',
                width: 200, height: 83, fit: BoxFit.cover),
            SizedBox(height: 200),
            Text(
              'If you have an account, please login or else register.',
              style: TextStyle(fontSize: 13, color: Colors.white),
            ),
            SizedBox(height: 80),
            // Login button
            ElevatedButton.icon(
              label: Text('Login',
                  style: TextStyle(color: Colors.black, fontSize: 18)),
              icon: Icon(
                Icons.login,
                color: Colors.black,
                size: 26,
              ),
              style: ButtonStyle(
                minimumSize: MaterialStateProperty.all(Size(150, 50)),
              ),
              onPressed: () {
                Navigator.of(context).pushNamed('/login');
              },
            ),
            SizedBox(height: 30),
            // register button
            ElevatedButton.icon(
              label: Text('Register',
                  style: TextStyle(color: Colors.black, fontSize: 18)),
              icon: Icon(
                Icons.app_registration,
                color: Colors.black,
                size: 26,
              ),
              style: ButtonStyle(
                minimumSize: MaterialStateProperty.all(Size(150, 50)),
              ),
              onPressed: () {
                Navigator.of(context).pushNamed('/register');
              },
            ),
          ],
        ),
      ),
    );
  }
}
