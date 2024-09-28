//Title constructor function that creates a Title object
function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function () {
  return this.mytitle;
};

var socialMedia = {
  facebook: "http://facebook.com",
  twitter: "http://twitter.com",
  flickr: "http://flickr.com",
  youtube: "http://youtube.com",
};

var t = new Title("CONNECT WITH ME!");

// Set a listener when the page loaded
document.addEventListener("DOMContentLoaded", function () {
  const fullName = "Melantha (Yuxuan) Chen";
  const NUID = "002055444";
  // Pop up my name and nuid when the page loaded
  showPopup(`Name: ${fullName}, NUID: ${NUID}`);

  // The dropdown should be hidden when the page loaded
  let dropDownRows = document.querySelectorAll(".dropDownTextArea");
  dropDownRows.forEach((row) => {
    row.style.display = "none";
  });

  // Set listener to the checkbox
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckBoxChange);
  });

  // Submit button should be disabled and grey out as default
  const submitButton = document.getElementById("button");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.style.backgroundColor = "grey";
    submitButton.style.borderColor = "grey";
  }

  // Add listener to the add button
  const addButton = document.getElementById("add");
  if (addButton) {
    addButton.addEventListener("click", addNewStudent);
  }

  // Add listener to the dropdown control img
  const dropdown = document.querySelectorAll('img[src="down.png"]');
  if (dropdown) {
    dropdown.forEach((arrow) => {
      arrow.addEventListener("click", toggleRowExpansion);
    });
  }
});

// Function for handle the all the checkbox function
function handleCheckBoxChange() {
  const rows = document.querySelectorAll("#myTable tr");
  const submitButton = document.getElementById("button");
  const checkedBoxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  // If non of the checkbox is checked, the submit button should be disabled and grey out
  if (checkedBoxes.length === 0) {
    submitButton.disabled = true;
    submitButton.style.backgroundColor = "grey";
    submitButton.style.borderColor = "grey";
    rows.forEach((row) => {
      row.style.backgroundColor = "";
    });
  } else {
    // If one or more checkbox checked, button should be enabled
    submitButton.disabled = false;

    // Condition for if only one check box is checked, the row bg and button bg should be orange
    if (checkedBoxes.length === 1) {
      submitButton.style.backgroundColor = "orange";
      submitButton.style.borderColor = "orange";
      rows.forEach((row) => {
        if (row.querySelector('input[type="checkbox"]:checked')) {
          row.style.backgroundColor = "orange";
        } else {
          row.style.backgroundColor = "";
        }
      });
      // Condition for if two or more checkbox checked, the row bg and button bg should be yellow
    } else if (checkedBoxes.length >= 2) {
      submitButton.style.backgroundColor = "yellow";
      submitButton.style.borderColor = "yellow";
      rows.forEach((row) => {
        if (row.querySelector('input[type="checkbox"]:checked')) {
          row.style.backgroundColor = "yellow";
        } else {
          row.style.backgroundColor = "";
        }
      });
    }
  }

  // Checkbox for the display of the delete and edit
  checkedBoxes.forEach((checkbox) => {
    const row = checkbox.closest("tr");

    // If delete button is not created then create one
    if (!row.querySelector("button.delete")) {
      const deleteButton = document.createElement("button");
      deleteButton.className = "delete";
      deleteButton.textContent = "Delete";
      // If the delete button clicked, then delete the row and its dropdown
      deleteButton.addEventListener("click", function () {
        const studentName = row.cells[1].textContent;
        const dropDownRow = row.nextElementSibling;
        if (dropDownRow && dropDownRow.classList.contains("dropDownTextArea")) {
          dropDownRow.remove();
        }
        // Show the pop up message for deletion
        showPopup(`${studentName} Revoed deleted successfully`);
        row.remove();
      });
      row.cells[8].appendChild(deleteButton);
    }

    // If edit button is not created then create one
    if (!row.querySelector("button.edit")) {
      const editButton = document.createElement("button");
      editButton.className = "edit";
      editButton.textContent = "Edit";
      // If the edit button clicked, then should the edition pop up for the row
      editButton.addEventListener("click", function () {
        const studentName = row.cells[1].textContent;
        showEditPopup(studentName, row);
      });
      row.cells[9].appendChild(editButton);
    }
  });

  const uncheckedRows = document.querySelectorAll(
    'input[type="checkbox"]:not(:checked)'
  );
  // If the checkbox is unchecked, the delete and edit buttons should be hidden
  uncheckedRows.forEach((uncheckedCheckbox) => {
    const row = uncheckedCheckbox.closest("tr");
    if (row.querySelector("button.delete")) {
      row.querySelector("button.delete").remove();
    }
    if (row.querySelector("button.edit")) {
      row.querySelector("button.edit").remove();
    }
  });
}

// Function for add new student button
function addNewStudent() {
  // Track the student number and add one for newly added student record
  const studentCount =
    document.querySelectorAll("input[type='checkbox']").length + 1;

  // Add same content for the newly added student record
  try {
    const table = document.getElementById("myTable");
    const row = table.insertRow(-1);
    row.innerHTML = `
      <td><input type="checkbox" /><br /><br /><img src="down.png" width="25px" /></td>
      <td>Student ${studentCount}</td>
      <td>Teacher ${studentCount}</td>
      <td>Approved</td>
      <td>Fall</td>
      <td>TA</td>
      <td>${studentCount}${studentCount + 1}${studentCount + 2}${
      studentCount + 3
    }${studentCount + 4}</td>
      <td>100%</td>
      <td></td>
      <td></td>
    `;

    const dropDownRow = table.insertRow(-1);
    dropDownRow.className = "dropDownTextArea";
    dropDownRow.style.display = "none";
    dropDownRow.innerHTML = `
    <td colspan="8">
      Advisor:<br /><br />
      Award Details<br />
      Summer 1-2014(TA)<br />
      Budget Number: <br />
      Tuition Number: <br />
      Comments:<br /><br /><br />
      Award Status:<br /><br /><br />
    </td>
  `;

    // Show the pop up message for add student
    showPopup(`Student ${studentCount} Record added successfully`);
    // Add listener to the newly added student record
    row
      .querySelector('input[type="checkbox"]')
      .addEventListener("change", handleCheckBoxChange);
    row
      .querySelector('img[src="down.png"]')
      .addEventListener("click", toggleRowExpansion);
  } catch (error) {
    // Pop up error message if the add function work failed
    showPopup(`Student ${studentCount} Record add failed: `, error);
  }
}

// Function for the dropdown img control
function toggleRowExpansion(event) {
  const dropDownRow = event.target.closest("tr").nextElementSibling;
  dropDownRow.style.display =
    dropDownRow.style.display === "none" ? "table-row" : "none";
}

// Function for pop up message
function showPopup(message) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerHTML = `<span class=""popuptext>${message}</span>`;
  document.body.appendChild(popup);
  popup.classList.add("show");

  // Set a time limit for the pop up message
  setTimeout(() => {
    popup.classList.remove("show");
    popup.remove();
  }, 3000);
}

// Function for the edit button pop up
function showEditPopup(studentName, row) {
  const popup = document.createElement("div");
  popup.className = "popup";
  // Create the popup content
  popup.innerHTML = `
      <div class="popup-content">
          <h2>Edit details of ${studentName}</h2>
          <p>Student: ${row.cells[1].textContent}</p>
          <p>Advisor: ${row.cells[2].textContent}</p>
          <p>Award Status: ${row.cells[3].textContent}</p>
          <p>Semester: ${row.cells[4].textContent}</p>
          <p>Type: ${row.cells[5].textContent}</p>
          <p>Budget #: ${row.cells[6].textContent}</p>
          <p>Percentage: ${row.cells[7].textContent}</p>
          <button class="update">Update</button>
          <button class="cancel">Cancel</button>
      </div>
  `;

  // Append the popup to the body
  document.body.appendChild(popup);

  // Add event listeners for the buttons inside the popup
  popup.querySelector(".update").addEventListener("click", function () {
    showPopup(`${studentName} data updated successfully`);
    popup.remove(); // Close the popup
  });

  popup.querySelector(".cancel").addEventListener("click", function () {
    popup.remove(); // Close the popup
  });
}
