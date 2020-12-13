/*
PEDAC: Understand the Problem, Create Examples, Identify the Data Structures you
will use, Formulate an Algorithm, Code with intent

----------------------Understand the Problem----------------------- THINGS TO
CONSIDER: -If any part of the problem is unclear, ask for clarification. -Do I
need to return the same object or an entirely new one?

PROBLEM STATEMENT:

Modify this class so that constructor will optionally let you specify a fixed
banner width at the time the Banner object is created. The message in the banner
should be centered within the banner of that width. Decide for yourself how you
want to handle widths that are either too narrow or too wide.

EXPECTED INPUT:

EXPECTED OUTPUT:

RULES: EXPLICIT
    - constructor will optionally let you specify a fixed banner width
    - message in banner should be centered
    - Must handel banner width that are too narrow or wide
  IMPLICIT (What's not stated in the problem?)
    - The message length could be even or odd
    - The specified banner length could be even or odd
    -

QUESTIONS:
-
-
-
-----------------------Examples/ Test Cases------------------------ 
VALIDATE YOUR UNDERSTANDING OF THE PROBLEM

1. EXAMPLES - even message length even banner width
Message is: "abcd"
Banner width: 10

+--------+
|        |
|  abcd  |
|        |
+--------+

banner width is 20
+------------------+
|                  |
|     12345678     | 5 spaces 
|                  |
+------------------+


2. EXAMPLS - odd message length odd banner width
Message is: "efghi"
Banner width: 9

+-------+
|       |
| efghi |
|       |
+-------+

3. EXAMPLE - odd message length even banner width
Message is: "jlk"
Banner width: 8

+------+
|      |
| jkl  |
|      |
+------+

4. EXAMPLE - even message length odd banner width
Message is: "mnop"
Banner width: 11

+---------+
|         |
|  mnop   |
|         |
+---------+

+---------+
|         |
|  mnop   |
|         |
+---------+

5. EXAMPLE - message with NO banner width parameter
message is: "qrst"
banner width: 8

+------+
|      |
| qrst |
|      |
+------+

6. EXAMPLE - banner width parameter is the same as the message length. 

use default behavior.
message: "uvwx"
banner width: 4

+------+
|      |
| uvwx |
|      |
+------+

+------------+
|            |
| 0123456789 |
|            |
+------------+

------------------Data Structures and Algorithm--------------------
Construct the object
- IF no banner width parameter is given OR the banner width is the same as the
message length then the banner width should be equal to
the length of the message + 4
- Otherwise assume a banner width is specified 

NOTE: No matter what the banner length is the horizontalRule and emptyLine should be the same length

Display the horizontal Rule
 - the horizontalRule repeats the char "-" banner width times - 2 followed by a "-" 

Display the empty line
 - the emptyLine should display "|" repeat a space (" ") banner width times -2 followed by a "|"

Calculate the spaces that should apear at the start and end of a message returned as an array

Display the empty line

Display the horizontalRule





DISPLAYING NARROW BANNERS
[what's, up, my, dude]
+-----+      
|     |
| Wha |
| t's |
| up  | 
| my  |
| dud |
| e   |
|     |
+-----+
*/


/*
NOTE: 
I decided that banner width that are wider than the message will center the message with equal spacing on both sides of the message. Wherein this cannot be done (ie. an odd message length and an even banner width) an extra space is used at the end of the message to get as close to center as possible. Additionally, banner widths that are too narrow to fit an entire message on a single line will chop the message into segments that fit the banner width and preserve a single space before and after each segment. As a result of these conditions the minimum banner width is 5. Any shorter and the code wont work as desired.
*/



class Banner {
  constructor(message, bannerWidth = message.length + 4) {
    this.message = message;
    if (bannerWidth === this.message.length) {
      this.bannerWidth = message.length + 4;
    } else {
      this.bannerWidth = bannerWidth;
    }    
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return `+${'-'.repeat(this.bannerWidth - 2)}+`;
  }

  emptyLine() {
    return `|${' '.repeat(this.bannerWidth - 2)}|`;
  }

  messageLine() {
    if (this.bannerWidth >= this.message.length) {
      let frontAndBackSpaces = this.calcSpaces(this.message.length, this.bannerWidth);
      return `|${frontAndBackSpaces[0]}${this.message}${frontAndBackSpaces[1]}|`;  

    } else {
      const maxSegmentLength = this.bannerWidth - 4;
      let messageSegments = [];
      let count = 1;
      let messageCopy = this.message;

      while (messageCopy) {
        if (messageCopy.startsWith(" ")) {
          messageCopy = messageCopy.slice(1);
        }
        
        if (count === maxSegmentLength) {
          messageSegments.push("| " + messageCopy.slice(0, maxSegmentLength) + " |");
          messageCopy = messageCopy.slice(maxSegmentLength);
          count = 0;
        } else if (messageCopy.length < maxSegmentLength) {
          let segment = "| " + messageCopy;
          segment += " ".repeat((this.bannerWidth - segment.length) - 1) + "|";          
          messageSegments.push(segment);
          messageCopy = "";
        }
        count++;
      }

      return messageSegments.join("\n");
    }           
  }

  calcSpaces(msgLngth, bannerLength) {
    let spaces = []; 
    let totalSpaces = bannerLength - (msgLngth + 2);

    if (this.isEven(totalSpaces)) {
      spaces.push(" ".repeat(totalSpaces / 2));
      spaces.push(" ".repeat(totalSpaces / 2));
    } else {
      spaces.push(" ".repeat(Math.floor(totalSpaces / 2)));
      spaces.push(" ".repeat(Math.ceil(totalSpaces / 2)))
    }
    return spaces;
  }

  isEven(number) {
    return number % 2 === 0;
  }
}

// TEST CASES: Banner Widths that are bigger than message
let test1 = new Banner("This is a test", 14); // even message length, even banner width
let test2 = new Banner("How about another test.", 31); // odd message length, odd banner width
let test3= new Banner("cool blue", 20); // odd message length, even banner width
let test4 = new Banner("monkey see monkey do", 35); // even message length, odd banner width
let test5 = new Banner("12345", 5) // message length is equal to the banner width

test1.displayBanner();
test2.displayBanner();
test3.displayBanner();
test4.displayBanner();
test5.displayBanner();

// TEST CASE: Banner length not specified
let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();

// TEST CASES: Banners widths that are smaller than message
let narrow1 = new Banner("This is a test to see if the formatting of this string will fit in the narrowest banner width of 5", 5)
let narrow2 = new Banner("This is another test for narrow banner widths. What is your favorite color?", 10);

narrow1.displayBanner();
narrow2.displayBanner();


/*
+------+
| 12345|

*/