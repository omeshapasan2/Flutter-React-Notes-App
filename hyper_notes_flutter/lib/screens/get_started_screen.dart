import 'package:flutter/material.dart';
import 'dart:async';
import 'login_screen.dart';

class OnboardingScreen extends StatefulWidget {
  @override
  _OnboardingScreenState createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> with SingleTickerProviderStateMixin {
  final PageController _pageController = PageController();
  int _currentPage = 0;
  Timer? _autoSwipeTimer;
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;
  bool _isDarkMode = true;

  final List<OnboardingItem> _onboardingItems = [
    OnboardingItem(
      title: "Welcome to HyperNotes",
      description: "Your intelligent note-taking companion with dark and light themes",
      imagePath: "assets/onboarding_1.png",
      darkMode: true
    ),
    OnboardingItem(
      title: "Create Notes Instantly",
      description: "Type and save your thoughts with a beautiful interface",
      imagePath: "assets/onboarding_2.png",
      darkMode: false
    ),
    OnboardingItem(
      title: "Switch Between Themes",
      description: "Enjoy both dark and light modes for comfortable writing any time",
      imagePath: "assets/onboarding_3.png",
      darkMode: true
    ),
  ];

  @override
  void initState() {
    super.initState();
    // Set up animation controller
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 500),
      vsync: this,
    );
    
    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeIn)
    );
    
    _animationController.forward();
    
    // Set up auto-swiping timer
    _autoSwipeTimer = Timer.periodic(Duration(seconds: 5), (timer) {
      if (_currentPage < _onboardingItems.length - 1) {
        _pageController.nextPage(
          duration: Duration(milliseconds: 800),
          curve: Curves.easeInOut,
        );
      } else {
        _pageController.animateToPage(
          0,
          duration: Duration(milliseconds: 800),
          curve: Curves.easeInOut,
        );
      }
    });
    
    // Listen for page changes
    _pageController.addListener(() {
      int newPage = _pageController.page?.round() ?? 0;
      if (newPage != _currentPage) {
        setState(() {
          _currentPage = newPage;
          _isDarkMode = _onboardingItems[_currentPage].darkMode;
        });
        // Restart the fade animation when page changes
        _animationController.reset();
        _animationController.forward();
      }
    });
  }

  @override
  void dispose() {
    _pageController.dispose();
    _autoSwipeTimer?.cancel();
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Colors for dark and light modes
    final backgroundColor = _isDarkMode ? Colors.black : Color(0xFFF5F5F5);
    final textColor = _isDarkMode ? Colors.white : Colors.black87;
    final secondaryTextColor = _isDarkMode ? Colors.grey[400] : Colors.grey[700];
    final accentColor = _isDarkMode ? Color(0xFF4ECDC4) : Color(0xFF4ECDC4);
    final noteColor = _isDarkMode ? Colors.amber[300] : Colors.amber[300];
    
    return Scaffold(
      backgroundColor: backgroundColor,
      body: SafeArea(
        child: Column(
          children: [
            // Skip button at top right
            Align(
              alignment: Alignment.topRight,
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: TextButton(
                  onPressed: () {
                    Navigator.pushReplacement(
                      context,
                      PageRouteBuilder(
                        pageBuilder: (context, animation1, animation2) => LoginScreen(),
                        transitionDuration: Duration(milliseconds: 500),
                        transitionsBuilder: (context, animation, secondaryAnimation, child) {
                          var begin = Offset(1.0, 0.0);
                          var end = Offset.zero;
                          var curve = Curves.ease;
                          var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
                          return SlideTransition(
                            position: animation.drive(tween),
                            child: child,
                          );
                        },
                      ),
                    );
                  },
                  child: Text(
                    "Skip",
                    style: TextStyle(
                      color: accentColor,
                      fontSize: 16,
                    ),
                  ),
                ),
              ),
            ),
            
            // Page content
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                onPageChanged: (int page) {
                  setState(() {
                    _currentPage = page;
                    _isDarkMode = _onboardingItems[page].darkMode;
                  });
                },
                itemCount: _onboardingItems.length,
                itemBuilder: (context, index) {
                  return FadeTransition(
                    opacity: _fadeAnimation,
                    child: buildOnboardingPage(
                      _onboardingItems[index],
                      textColor,
                      secondaryTextColor,
                      accentColor,
                      noteColor,
                    ),
                  );
                },
              ),
            ),
            
            // Page indicator and buttons
            Container(
              padding: EdgeInsets.all(20),
              child: Column(
                children: [
                  // Page indicator dots
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(
                      _onboardingItems.length,
                      (index) => buildDot(index, accentColor),
                    ),
                  ),
                  SizedBox(height: 30),
                  
                  // Next/Get Started button
                  GetStartedButton(
                    onPressed: () {
                      if (_currentPage < _onboardingItems.length - 1) {
                        _pageController.nextPage(
                          duration: Duration(milliseconds: 500),
                          curve: Curves.easeInOut,
                        );
                      } else {
                        Navigator.pushReplacement(
                          context,
                          MaterialPageRoute(builder: (context) => LoginScreen()),
                        );
                      }
                    },
                    text: _currentPage < _onboardingItems.length - 1 ? "Next" : "Get Started",
                    accentColor: accentColor,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget buildOnboardingPage(
    OnboardingItem item,
    Color textColor,
    Color? secondaryTextColor,
    Color accentColor,
    Color? noteColor,
  ) {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // App logo/icon animation
          TweenAnimationBuilder(
            tween: Tween<double>(begin: 0.8, end: 1.0),
            duration: Duration(milliseconds: 1000),
            curve: Curves.elasticOut,
            builder: (context, double value, child) {
              return Transform.scale(
                scale: value,
                child: child,
              );
            },
            child: buildMockScreenImage(item, accentColor, noteColor),
          ),
          SizedBox(height: 50),
          
          // Title with typing animation
          TypewriterAnimatedText(
            text: item.title,
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
              color: textColor,
            ),
          ),
          SizedBox(height: 16),
          
          // Description
          Text(
            item.description,
            style: TextStyle(
              fontSize: 16,
              color: secondaryTextColor,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget buildMockScreenImage(OnboardingItem item, Color accentColor, Color? noteColor) {
    return Container(
      width: 280,
      height: 400,
      decoration: BoxDecoration(
        color: item.darkMode ? Colors.black : Color(0xFFF5F5F5),
        borderRadius: BorderRadius.circular(32),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.2),
            blurRadius: 15,
            offset: Offset(0, 5),
          ),
        ],
      ),
      child: Column(
        children: [
          // Status bar
          Container(
            padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "9:46",
                  style: TextStyle(
                    color: item.darkMode ? Colors.white : Colors.black87,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Row(
                  children: [
                    Icon(
                      Icons.signal_cellular_alt,
                      size: 14,
                      color: item.darkMode ? Colors.white : Colors.black87,
                    ),
                    SizedBox(width: 4),
                    Icon(
                      Icons.wifi,
                      size: 14,
                      color: item.darkMode ? Colors.white : Colors.black87,
                    ),
                    SizedBox(width: 4),
                    Text(
                      "100%",
                      style: TextStyle(
                        color: item.darkMode ? Colors.white : Colors.black87,
                        fontSize: 12,
                      ),
                    ),
                    Icon(
                      Icons.battery_full,
                      size: 14,
                      color: item.darkMode ? Colors.white : Colors.black87,
                    ),
                  ],
                ),
              ],
            ),
          ),
          
          // App header
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Icon(Icons.arrow_back, color: accentColor, size: 20),
                    SizedBox(width: 8),
                    Text(
                      "HyperNotes",
                      style: TextStyle(
                        color: accentColor,
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        fontFamily: 'Courier',
                      ),
                    ),
                  ],
                ),
                Row(
                  children: [
                    Icon(
                      item.darkMode ? Icons.dark_mode : Icons.light_mode,
                      color: accentColor,
                      size: 20,
                    ),
                    SizedBox(width: 8),
                    Icon(Icons.share, color: accentColor, size: 20),
                  ],
                ),
              ],
            ),
          ),
          
          // Search bar
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: item.darkMode ? Colors.grey[900] : Colors.grey[200],
                borderRadius: BorderRadius.circular(20),
              ),
              child: Row(
                children: [
                  Icon(
                    Icons.search,
                    color: item.darkMode ? Colors.grey[400] : Colors.grey[600],
                    size: 18,
                  ),
                  SizedBox(width: 8),
                  Text(
                    "Search notes...",
                    style: TextStyle(
                      color: item.darkMode ? Colors.grey[400] : Colors.grey[600],
                      fontSize: 14,
                    ),
                  ),
                ],
              ),
            ),
          ),
          
          // Note cards
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // First note
                Container(
                  width: 110,
                  height: 110,
                  padding: EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: noteColor,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        "HyperNotes",
                        style: TextStyle(
                          color: Colors.black87,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            "2025-04-08",
                            style: TextStyle(
                              color: Colors.black54,
                              fontSize: 10,
                            ),
                          ),
                          Icon(Icons.delete_outline, color: Colors.black54, size: 14),
                        ],
                      ),
                    ],
                  ),
                ),
                
                // Second note
                Container(
                  width: 110,
                  height: 110,
                  padding: EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: noteColor,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        "Your Intelligent Note Taking Companion!!",
                        style: TextStyle(
                          color: Colors.black87,
                          fontWeight: FontWeight.w600,
                          fontSize: 12,
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            "2025-04-08",
                            style: TextStyle(
                              color: Colors.black54,
                              fontSize: 10,
                            ),
                          ),
                          Icon(Icons.delete_outline, color: Colors.black54, size: 14),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          
          Spacer(),
          
          // Note input area or add button
          if (_currentPage == 1)
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                decoration: BoxDecoration(
                  color: accentColor,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      "Type your note here...",
                      style: TextStyle(
                        color: Colors.black54,
                        fontSize: 14,
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.black54,
                        borderRadius: BorderRadius.circular(4),
                      ),
                      child: Text(
                        "SAVE",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            )
          else
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: accentColor,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(Icons.add, color: Colors.white),
              ),
            ),
        ],
      ),
    );
  }

  Widget buildDot(int index, Color accentColor) {
    double size = 8;
    double activeSize = 24;
    
    return AnimatedContainer(
      duration: Duration(milliseconds: 200),
      margin: EdgeInsets.symmetric(horizontal: 4),
      height: size,
      width: _currentPage == index ? activeSize : size,
      decoration: BoxDecoration(
        color: _currentPage == index ? accentColor : Colors.grey.withOpacity(0.5),
        borderRadius: BorderRadius.circular(size / 2),
      ),
    );
  }
}

// Onboarding item model
class OnboardingItem {
  final String title;
  final String description;
  final String imagePath;
  final bool darkMode;

  OnboardingItem({
    required this.title,
    required this.description,
    required this.imagePath,
    required this.darkMode,
  });
}

// Animated typewriter text widget
class TypewriterAnimatedText extends StatefulWidget {
  final String text;
  final TextStyle style;

  TypewriterAnimatedText({
    required this.text,
    required this.style,
  });

  @override
  _TypewriterAnimatedTextState createState() => _TypewriterAnimatedTextState();
}

class _TypewriterAnimatedTextState extends State<TypewriterAnimatedText> with SingleTickerProviderStateMixin {
  String _displayText = "";
  late Timer _timer;
  int _charIndex = 0;

  @override
  void initState() {
    super.initState();
    _startTyping();
  }

  void _startTyping() {
    _timer = Timer.periodic(Duration(milliseconds: 100), (timer) {
      if (_charIndex < widget.text.length) {
        setState(() {
          _displayText = widget.text.substring(0, _charIndex + 1);
          _charIndex++;
        });
      } else {
        _timer.cancel();
      }
    });
  }

  @override
  void didUpdateWidget(TypewriterAnimatedText oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.text != widget.text) {
      _charIndex = 0;
      _displayText = "";
      _timer.cancel();
      _startTyping();
    }
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Text(
      _displayText,
      style: widget.style,
      textAlign: TextAlign.center,
    );
  }
}

// Animated button for Next/Get Started
class GetStartedButton extends StatefulWidget {
  final VoidCallback onPressed;
  final String text;
  final Color accentColor;

  const GetStartedButton({
    Key? key,
    required this.onPressed,
    required this.text,
    required this.accentColor,
  }) : super(key: key);

  @override
  _GetStartedButtonState createState() => _GetStartedButtonState();
}

class _GetStartedButtonState extends State<GetStartedButton> with SingleTickerProviderStateMixin {
  late AnimationController _buttonAnimationController;
  late Animation<double> _buttonScaleAnimation;

  @override
  void initState() {
    super.initState();
    
    // Initialize animation controller
    _buttonAnimationController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    
    // Initialize the scale animation
    _buttonScaleAnimation = Tween<double>(begin: 1.0, end: 0.95).animate(
      CurvedAnimation(
        parent: _buttonAnimationController,
        curve: Curves.easeInOut,
      ),
    );
  }

  @override
  void dispose() {
    _buttonAnimationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => _buttonAnimationController.forward(),
      onTapUp: (_) => _buttonAnimationController.reverse(),
      onTapCancel: () => _buttonAnimationController.reverse(),
      child: AnimatedBuilder(
        animation: _buttonScaleAnimation,
        builder: (context, child) {
          return Transform.scale(
            scale: _buttonScaleAnimation.value,
            child: Container(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: widget.onPressed,
                style: ElevatedButton.styleFrom(
                  padding: EdgeInsets.symmetric(vertical: 16.0),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12.0),
                  ),
                  backgroundColor: widget.accentColor,
                  elevation: 4,
                ),
                child: Text(
                  widget.text,
                  style: TextStyle(fontSize: 18, color: Colors.white),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}