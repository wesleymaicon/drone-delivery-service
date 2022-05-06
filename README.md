**Drone Delivery Service**

**GitHub:**

**Wesley Maicon Ferreira da Silva**

**Proposed Solution**

To optimize the deliveries and make the fewest number of trips, I sorted
the drones and the locations considering respectively the maxWeight of
the drones and the packageWeight of the locations. Then, I iterate each
drone creating a list of trips, adding delivery locations to the drone
until it reaches its maximum capacity, and new trips are created for the
drone until the remaining delivery weight cannot be handled by the next
drone.

In the following example, by having ordered the drones and the
locations, it is possible to carry out all the deliveries in a single
trip, instead of making a trip with Drone A and another with Drone B.

**Input**

\[Drone A\], \[30\], \[Drone B\], \[50\]

\[Location A\], \[15\]

\[Location B\], \[18\]

Location C\], \[12\]

\[Location D\], \[5\]

**Output with ordered drones and locations (proposed solution)**

**\[Drone B\]**

Trip \#1

\[Location B\], \[Location A\], \[Location C\], \[Location D\]

**Output without ordered drones and locations (unoptimized solution)**

**\[Drone A\]**

Trip \#1

\[Location A\], \[Location C\]

**\[Drone B\]**

Trip \#1

\[Location B\], \[Location D\]

**Assumptions**

-   The drones will always be listed on the first line of the CSV file.

-   The locations will always be listed after the first line of the
    CSV file.

-   Will have at most one location per line.

-   The input file cannot have empty lines except the last one.

-   The software output only shows the drones which have trips.

-   Shows an error message in case of drones maxWeight is less than
    required to create the trips.

-   Shows an error message in case of input file does not exist.

-   Use the command “npm install” to install the project dependencies.

-   Use the command “npm start” to run the project.

-   Use the command “npm test” to run the unit tests.

-   The sample CSV file it’s located inside the data folder

**Best Practices**

-   Built the solution using TypeScript, to avoid errors, and make the
    code easier to read.

-   Code indentation to make the code easier to understand.

-   Intuitive names to objects, variables, constants, types, files,
    folders, and functions.

-   Folders to organize the source code.

-   Comments on important parts of the code.

-   Utils folder, to provide functions that can be reused in different
    parts of the code.

-   Unit tests to ensure the quality of the code.

-   Show errors on the console in case of failure.

**Technical Dependencies and Libraries**

-   Visual Studio Code 1.65.2 → Code editor.

-   Node.js v12.16.3 → JavaScript runtime.

-   NPM 6.14.4 → Package manager.

-   TypeScript 4.6.4 → Strong typed programming language that builds
    on JavaScript.

-   ts-node-dev 1.1.8 → Compiles TypeScript.

-   jest 28.0.3 → Javascript testing framework.

-   ts-jest 28.0.1 → Make it possible to use Jest to test projects
    written in TypeScript.

-   cli-color 2.0.2 → Make it possible to format the text printed on
    the console.

**Sample 1**

\*\*\*BEGIN INPUT FILE \#1\*\*\*

\[Drone A\], \[50\], \[Drone B\], \[60\], \[Drone C\], \[30\]

\[Location A\], \[15\]

\[Location B\], \[18\]

\[Location C\], \[15\]

\[Location D\], \[8\]

\[Location E\], \[25\]

\[Location F\], \[40\]

\[Location G\], \[30\]

\[Location H\], \[15\]

\[Location I\], \[46\]

\[Location J\], \[20\]

\[Location K\], \[10\]

\[Location L\], \[15\]

\[Location M\], \[18\]

\[Location N\], \[60\]

\[Location O\], \[48\]

\[Location P\], \[45\]

\[Location Q\], \[25\]

\*\*\*END INPUT FILE \#1\*\*\*

\*\*\*BEGIN OUPUT FILE \#1\*\*\*

**\[Drone A\]**

Trip \#1

\[Location M\], \[Location H\], \[Location L\]

**\[Drone B\]**

Trip \#1

\[Location N\]

Trip \#2

\[Location O\], \[Location K\]

Trip \#3

\[Location I\], \[Location D\]

Trip \#4

\[Location P\], \[Location A\]

Trip \#5

\[Location F\], \[Location J\]

Trip \#6

\[Location G\], \[Location E\]

Trip \#7

\[Location Q\], \[Location B\], \[Location C\]

\*\*\*END OUPUT FILE \#1\*\*\*

**Sample 2**

\*\*\*BEGIN INPUT FILE \#2\*\*\*

\[Drone A\], \[35\], \[Drone B\], \[60\]

\[Location A\], \[15\]

\[Location B\], \[18\]

\[Location C\], \[15\]

\[Location D\], \[8\]

\[Location E\], \[25\]

\[Location F\], \[40\]

\[Location G\], \[30\]

\[Location H\], \[15\]

\[Location I\], \[46\]

\[Location J\], \[20\]

\[Location K\], \[10\]

\[Location L\], \[15\]

\*\*\*END INPUT FILE \#2\*\*\*

\*\*\*BEGIN OUTPUT FILE \#2\*\*\*

**\[Drone A\]**

Trip \#1

\[Location H\], \[Location L\]

**\[Drone B\]**

Trip \#1

\[Location I\], \[Location K\]

Trip \#2

\[Location F\], \[Location J\]

Trip \#3

\[Location G\], \[Location E\]

Trip \#4

\[Location B\], \[Location A\], \[Location C\], \[Location D\]

\*\*\*END OUTPUT FILE \#2\*\*\*
