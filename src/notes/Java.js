let Variables =  `
Variables

Variables are containers for storing data values. In C++, there are different types of variables (defined with different keywords).
In programming, a variable is a value that can change, depending on conditions or on information passed to the program. ... In object-oriented programming , each object contains the data variables of the class it is an instance of.
int - stores integers (whole numbers), without decimals, such as 123 or -123
double - stores floating point numbers, with decimals, such as 19.99 or -19.99
char - stores single characters, such as 'a' or 'B'. Char values are surrounded by single quotes
string - stores text, such as "Hello World". String values are surrounded by double quotes
bool - stores values with two states: true or false

Declaring (Creating) Variables
To create a variable, you must specify the type and assign it a value:
Syntax
type variable = value;
Where type is one of C++ types (such as int), and variable is the name of the variable (such as x or myName). The equal sign is used to assign values to the variable.

To create a variable that should store a number, look at the following example:
Example
Create a variable called myNum of type int and assign it the value 15:
int myNum = 15;
cout << myNum;
Output: 15

Example
int myNum = 15;  // myNum is 15
myNum = 10;  // Now myNum is 10
cout << myNum;  // Outputs 10

Add Variables Together
To add a variable to another variable, you can use the + operator:
Example
int x = 5;
int y = 6;
int sum = x + y;
cout << sum;
Output:11

Declare Many Variables
To declare more than one variable of the same type, use a comma-separated list:
Example
int x = 5, y = 6, z = 50;
cout << x + y + z;
Output:61


`

let Functions = `
this is the theory of funtions

types of functions:-
1) iao
2) kmkm
`

let Loops = `
types of loops:-
1)while loop
2)for loop
`
module.exports.topics = {Variables, Functions, Loops};