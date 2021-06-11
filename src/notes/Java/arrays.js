let arrays = 
<div className="info-main">
                <h3 className="sub-head">Pointers</h3>
                <p>Pointer is a variable in C++ that holds the address of another variable. They have data type just like variables, 
                for example an integer type pointer can hold the address of an integer variable and an character type pointer can 
                hold the address of char variable.In C++, a pointer refers to a variable that holds the address of another variable. 
                Like regular variables, pointers have a data type. 
                <br></br><br></br>For example, a pointer of type integer can hold the address of a 
                variable of type integer. A pointer of character type can hold the address of a variable of character type.
                <br></br><b>Example</b><br></br>{'string food = "Pizza";'} <br></br>{'cout << food; // Output the value of food (Pizza)'}
                <br></br>{'cout << &food;// Output the memory address of food (0x6dfed4)'}<br></br><br></br>
                A pointer however, is a variable that stores the memory address as its value. A pointer variable points to a
                 data type (like int or string) of the same type, and is created with the * operator.<br></br>
                 The address of the variable you are working with is assigned to the pointer:</p>

                
                <pre className="code">
                    <code>
                    {
                        <p>Example:<br></br>{'string food = "Pizza";// A food variable of type string'}<br></br>
                        {'string* ptr = &food;// A pointer variable, with the name ptr, that stores the address of food'}<br></br>
                        {'cout << food ;'}<br></br>{'cout << &food;'}<br></br>{'cout << ptr ;'}<br></br><br></br><b>Example explained</b><br></br>
                        Create a pointer variable with the name ptr, that points to a string variable, by using the asterisk
                         sign {'* (string* ptr).'}<br></br>Note that the type of the pointer has to match the type of the variable you 
                         are working with. Use the & operator to store the memory address of the variable called food, and <br></br>
                         assign it to the pointer. Now, ptr holds the value of foods memory address.<br></br><br></br><br></br>
                         
                         <b>Get Memory Address and Value</b><br></br>In the example from the previous page, we used the pointer variable to
                         get the memory address of a variable (used together with the & reference operator). However, you can<br></br>also use the
                          pointer to get the value of the variable, by using the * operator(the dereference operator):<br></br><br></br>
                          Example:<br></br>{'string food = "Pizza";//Variable declaration'} <br></br>{'string* ptr = &food;// Pointer declaration'} 
                          <br></br>{'cout << ptr // Reference: Output the memory address of food with the pointer (0x6dfed4)'} 
                          <br></br>{'cout << *ptr;// Dereference: Output the value of food with the pointer (Pizza)'}<br></br> <br></br>
                           Note that the * sign can be confusing here, as it does two different things in our code:
                            When used in declaration (string* ptr), it creates a pointer variable.
                            When not<br></br>used in declaration, it act as a dereference operator.<br></br> </p>   
                    }
                    </code>
                </pre>
            </div>

export default arrays