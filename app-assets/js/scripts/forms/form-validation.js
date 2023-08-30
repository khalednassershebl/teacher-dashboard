/*=========================================================================================
  File Name: form-validation.js
  Description: jquery bootstrap validation js
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: PIXINVENT
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(function () {
  "use strict";

  var bootstrapForm = $(".needs-validation"),
    jqForm = $(".jquery-val-form"),
    picker = $("#dob"),
    dtPicker = $("#dob-bootstrap-val"),
    select = $(".select2"),
    accountUploadImg = $("#account-upload-img"),
    accountUploadBtn = $("#account-upload");

  // Update user photo on click of button
  if (accountUploadBtn) {
    accountUploadBtn.on("change", function (e) {
      var reader = new FileReader(),
        files = e.target.files;
      reader.onload = function () {
        if (accountUploadImg) {
          accountUploadImg.attr("src", reader.result);
        }
      };
      reader.readAsDataURL(files[0]);
    });
  }

  // select2
  select.each(function () {
    var $this = $(this);
    $this.wrap('<div class="position-relative"></div>');
    $this
      .select2({
        placeholder: "Select value",
        dropdownParent: $this.parent(),
      })
      .change(function () {
        $(this).valid();
      });
  });

  // Picker
  if (picker.length) {
    picker.flatpickr({
      allowInput: true,
      monthSelectorType: "static",
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr("step", null);
        }
      },
    });
  }

  if (dtPicker.length) {
    dtPicker.flatpickr({
      allowInput: true,
      monthSelectorType: "static",
      onReady: function (selectedDates, dateStr, instance) {
        if (instance.isMobile) {
          $(instance.mobileInput).attr("step", null);
        }
      },
    });
  }

  // Bootstrap Validation
  // --------------------------------------------------------------------
  if (bootstrapForm.length) {
    Array.prototype.filter.call(bootstrapForm, function (form) {
      form.addEventListener("submit", function (event) {
        if (form.checkValidity() === false) {
          form.classList.add("invalid");
        }
        form.classList.add("was-validated");
        event.preventDefault();
      });
    });
  }

  // jQuery Validation
  // --------------------------------------------------------------------
  if (jqForm.length) {
    jqForm.validate({
      rules: {
        "group-name": {
          required: true,
        },
        "basic-default-name": {
          required: true,
        },
        "basic-default-email": {
          required: true,
          email: true,
        },
        "basic-default-password": {
          required: true,
        },
        "confirm-password": {
          required: true,
          equalTo: "#basic-default-password",
        },
        "new-password": {
          required: true,
          minlength: 6,
        },
        "confirm-new-password": {
          required: true,
          minlength: 6,
          equalTo: "#account-new-password",
        },
        "select-country": {
          required: true,
        },
        "select-stage": {
          required: true,
        },
        dob: {
          required: true,
        },
        customFile: {
          required: true,
        },
        validationRadiojq: {
          required: true,
        },
        validationBiojq: {
          required: true,
        },
        validationCheck: {
          required: true,
        },
      },
    });
  }
});
