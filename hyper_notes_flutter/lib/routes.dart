import 'package:flutter/material.dart';
import 'screens/login_screen.dart';
import 'screens/register_screen.dart';
import 'screens/home_screen.dart';

class AppRoutes {
  // Remove the getStarted route from the constant string definitions
  // since AuthWrapper will handle displaying GetStartedScreen
  static const String login = '/login';
  static const String register = '/register';
  static const String home = '/home';

  static Map<String, WidgetBuilder> get routes => {
        // Remove the default route since we're using AuthWrapper as home
        // getStarted: (context) => GetStartedScreen(),
        login: (context) => LoginScreen(),
        register: (context) => RegisterScreen(),
        home: (context) => HomeScreen(),
      };
}