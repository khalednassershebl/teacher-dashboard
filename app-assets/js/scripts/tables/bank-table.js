/**
 * DataTables Basic
 */

$(function () {
  "use strict";

  var dt_basic_table = $(".datatables-basic"),
    dt_date_table = $(".dt-date"),
    dt_complex_header_table = $(".dt-complex-header"),
    dt_row_grouping_table = $(".dt-row-grouping"),
    dt_multilingual_table = $(".dt-multilingual"),
    assetPath = "../../../app-assets/";

  if ($("body").attr("data-framework") === "laravel") {
    assetPath = $("body").attr("data-asset-path");
  }

  // DataTable with buttons
  // --------------------------------------------------------------------

  if (dt_basic_table.length) {
    var dt_basic = dt_basic_table.DataTable({
      ajax: assetPath + "data/bank-data.json",
      columns: [
        { data: "id" },
        { data: "id" }, // used for sorting so will hide this column
        { data: "q-code" },
        { data: "question_name" },
        { data: "term" },
        { data: "stage" },
        { data: "branch_name" },
        { data: "unit_name" },
        { data: "lesson_name" },
        { data: "points" },
        { data: "start_date" },
        { data: "" },
      ],
      columnDefs: [
        {
          // For Checkboxes
          targets: 0,
          orderable: false,
          responsivePriority: 3,
          render: function (data, type, full, meta) {
            return (
              '<div class="custom-control custom-checkbox"> <input class="custom-control-input dt-checkboxes" type="checkbox" value="" id="checkbox' +
              data +
              '" /><label class="custom-control-label" for="checkbox' +
              data +
              '"></label></div>'
            );
          },
          checkboxes: {
            selectAllRender:
              '<div class="custom-control custom-checkbox"> <input class="custom-control-input" type="checkbox" value="" id="checkboxSelectAll" /><label class="custom-control-label" for="checkboxSelectAll"></label></div>',
          },
        },
        // 2
        {
          targets: 2,
          orderable: true,
          render: function (data, type, full, meta) {
            return `
              <div class="num-badge">
                <span class="num-badge-data">${data}</span>
              </div>
            `;
          },
        },
        // 4
        {
          targets: 4,
          orderable: true,
          render: function (data, type, full, meta) {
            return `
              <div class="num-badge">
                <span class="num-badge-data">${data}</span>
              </div>
            `;
          },
        },
        // 5
        {
          targets: 5,
          orderable: true,
          render: function (data, type, full, meta) {
            return `
              <div class="num-badge">
                <span class=" phone-badge-data td-135">${data}</span>
              </div>
            `;
          },
        },
        // 6
        {
          targets: 6,
          orderable: true,
          render: function (data, type, full, meta) {
            return `
              <div class="num-badge">
                <span class="num-badge-data">${data}</span>
              </div>
            `;
          },
        },
        // 7
        {
          targets: 7,
          orderable: true,
          render: function (data, type, full, meta) {
            return `
              <div class="num-badge">
                <span class="phone-badge-data td-170">${data}</span>
              </div>
            `;
          },
        },
        // 8
        {
          targets: 8,
          orderable: true,
          render: function (data, type, full, meta) {
            return `
              <div class="num-badge">
                <span class="phone-badge-data td-170">${data}</span>
              </div>
            `;
          },
        },
        // 9
        {
          targets: 9,
          orderable: true,
          render: function (data, type, full, meta) {
            return `
              <div class="num-badge">
                <span class="num-badge-data">${data}</span>
              </div>
            `;
          },
        },
        // 10
        {
          targets: 10,
          orderable: true,
          render: function (data, type, full, meta) {
            return `
              <div class="num-badge">
                <span class="num-badge-data">${data}</span>
              </div>
            `;
          },
        },
        // 3 [ Question Name ]
        {
          // Avatar image/badge, Name and post
          targets: 3,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $user_img = full["avatar"],
              $name = full["question_name"],
              $post = full["question_type"];
            if ($user_img) {
              // For Avatar image
              var $output =
                '<img src="' +
                assetPath +
                "images/avatars/" +
                $user_img +
                '" alt="Avatar" width="32" height="32">';
            } else {
              // For Avatar badge
              var stateNum = full["status"];
              var states = [
                "success",
                "danger",
                "warning",
                "info",
                "dark",
                "primary",
                "secondary",
              ];
              var $state = states[stateNum],
                $name = full["question_name"],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (
                ($initials.shift() || "") + ($initials.pop() || "")
              ).toUpperCase();
              $output = '<span class="avatar-content">' + $initials + "</span>";
            }

            var colorClass =
              $user_img === "" ? " bg-light-" + $state + " " : "";
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-left align-items-center">' +
              '<div class="d-flex flex-column">' +
              '<span class="emp_name text-truncate font-weight-bold">' +
              $name +
              "</span>" +
              '<small class="emp_post text-truncate text-muted">' +
              $post +
              "</small>" +
              "</div>" +
              "</div>";
            return $row_output;
          },
        },
        // -1 [ Actions ]
        {
          // Actions
          targets: -1, // Last Col
          title: "خيارات",
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="action-container">' +
              '<a href="#" class="table-item-icon tabele-item-show">' +
              feather.icons["eye"].toSvg({ class: "font-small-4" }) +
              "</a>" +
              '<a href="#" class="table-item-icon table-item-edit">' +
              feather.icons["edit"].toSvg({ class: "font-small-4" }) +
              "</a>" +
              '<a href="#" class="table-item-icon table-item-delete">' +
              feather.icons["trash"].toSvg({ class: "font-small-4" }) +
              "</a>" +
              "</div>"
            );
          },
        },
        { visible: false, targets: [0, 1, 4, 5, 6, 7, 8, 10] },
      ],
      order: [[1, "desc"]],
      // dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-right">B><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      dom: '<"top"fB>rt<"bottom"<"bc"li>p><"clear">',
      displayLength: 10,
      lengthMenu: [
        [10, 25, 50, 100, -1],
        [10, 25, 50, 100, "All"],
      ],
      buttons: [
        "colvis",
        {
          extend: "collection",
          className: "btn btn-outline-secondary dropdown-toggle mr-2",
          text:
            feather.icons["download"].toSvg({ class: "font-small-4 mr-50" }) +
            "تحميل",
          buttons: [
            {
              extend: "print",
              text:
                feather.icons["printer"].toSvg({
                  class: "font-small-4 mr-50",
                }) + "طباعة",
              className: "dropdown-item",
              exportOptions: { columns: [2, 3, 4, 6] },
            },
            {
              extend: "excel",
              text:
                feather.icons["file"].toSvg({ class: "font-small-4 mr-50" }) +
                "Excel",
              className: "dropdown-item",
              exportOptions: { columns: [2, 3, 4, 6] },
            },
          ],
        },
      ],
      language: {
        loadingRecords: "جارٍ التحميل...",
        lengthMenu: "_MENU_",
        zeroRecords: "لم يعثر على أية سجلات",
        info: "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
        search: "",
        paginate: {
          // remove previous & next text from pagination
          previous: "&nbsp;",
          next: "&nbsp;",
        },
        aria: {
          sortAscending: ": تفعيل لترتيب العمود تصاعدياً",
          sortDescending: ": تفعيل لترتيب العمود تنازلياً",
        },
        select: {
          rows: {
            _: "%d قيمة محددة",
            1: "1 قيمة محددة",
          },
          cells: {
            1: "1 خلية محددة",
            _: "%d خلايا محددة",
          },
          columns: {
            1: "1 عمود محدد",
            _: "%d أعمدة محددة",
          },
        },
        buttons: {
          print: "طباعة",
          copyKeys:
            "زر <i>ctrl</i> أو <i>⌘</i> + <i>C</i> من الجدول<br>ليتم نسخها إلى الحافظة<br><br>للإلغاء اضغط على الرسالة أو اضغط على زر الخروج.",
          pageLength: {
            "-1": "اظهار الكل",
            _: "إظهار %d أسطر",
          },
          collection: "مجموعة",
          copy: "نسخ",
          copyTitle: "نسخ إلى الحافظة",
          // csv: "CSV",
          excel: "ملف إكسيل",
          pdf: "ملف PDF",
          colvis: "إظهار الأعمدة",
          colvisRestore: "إستعادة العرض",
          copySuccess: {
            1: "تم نسخ سطر واحد الى الحافظة",
            _: "تم نسخ %ds أسطر الى الحافظة",
          },
        },
        searchBuilder: {
          add: "اضافة شرط",
          clearAll: "ازالة الكل",
          condition: "الشرط",
          data: "المعلومة",
          logicAnd: "و",
          logicOr: "أو",
          title: ["منشئ البحث"],
          value: "القيمة",
          conditions: {
            date: {
              after: "بعد",
              before: "قبل",
              between: "بين",
              empty: "فارغ",
              equals: "تساوي",
              notBetween: "ليست بين",
              notEmpty: "ليست فارغة",
              not: "ليست ",
            },
            number: {
              between: "بين",
              empty: "فارغة",
              equals: "تساوي",
              gt: "أكبر من",
              lt: "أقل من",
              not: "ليست",
              notBetween: "ليست بين",
              notEmpty: "ليست فارغة",
              gte: "أكبر أو تساوي",
              lte: "أقل أو تساوي",
            },
            string: {
              not: "ليست",
              notEmpty: "ليست فارغة",
              startsWith: " تبدأ بـ ",
              contains: "تحتوي",
              empty: "فارغة",
              endsWith: "تنتهي ب",
              equals: "تساوي",
              notContains: "لا تحتوي",
              notStarts: "لا تبدأ بـ",
              notEnds: "لا تنتهي بـ",
            },
            array: {
              equals: "تساوي",
              empty: "فارغة",
              contains: "تحتوي",
              not: "ليست",
              notEmpty: "ليست فارغة",
              without: "بدون",
            },
          },
          button: {
            0: "فلاتر البحث",
            _: "فلاتر البحث (%d)",
          },
          deleteTitle: "حذف فلاتر",
        },
        searchPanes: {
          clearMessage: "ازالة الكل",
          collapse: {
            0: "بحث",
            _: "بحث (%d)",
          },
          count: "عدد",
          countFiltered: "عدد المفلتر",
          loadMessage: "جارِ التحميل ...",
          title: "الفلاتر النشطة",
          showMessage: "إظهار الجميع",
          collapseMessage: "إخفاء الجميع",
        },
        infoThousands: ",",
        datetime: {
          previous: "السابق",
          next: "التالي",
          hours: "الساعة",
          minutes: "الدقيقة",
          seconds: "الثانية",
          unknown: "-",
          amPm: ["صباحا", "مساءا"],
          weekdays: [
            "الأحد",
            "الإثنين",
            "الثلاثاء",
            "الأربعاء",
            "الخميس",
            "الجمعة",
            "السبت",
          ],
          months: [
            "يناير",
            "فبراير",
            "مارس",
            "أبريل",
            "مايو",
            "يونيو",
            "يوليو",
            "أغسطس",
            "سبتمبر",
            "أكتوبر",
            "نوفمبر",
            "ديسمبر",
          ],
        },
        editor: {
          close: "إغلاق",
          create: {
            button: "إضافة",
            title: "إضافة جديدة",
            submit: "إرسال",
          },
          edit: {
            button: "تعديل",
            title: "تعديل السجل",
            submit: "تحديث",
          },
          remove: {
            button: "حذف",
            title: "حذف",
            submit: "حذف",
            confirm: {
              _: "هل أنت متأكد من رغبتك في حذف السجلات %d المحددة؟",
              1: "هل أنت متأكد من رغبتك في حذف السجل؟",
            },
          },
          error: {
            system: "حدث خطأ ما",
          },
          multi: {
            title: "قيم متعدية",
            restore: "تراجع",
          },
        },
        processing: "جارٍ المعالجة...",
        emptyTable: "لا يوجد بيانات متاحة في الجدول",
        infoEmpty: "يعرض 0 إلى 0 من أصل 0 مُدخل",
        thousands: ".",
        stateRestore: {
          creationModal: {
            columns: {
              search: "إمكانية البحث للعمود",
              visible: "إظهار العمود",
            },
            toggleLabel: "تتضمن",
          },
        },
        autoFill: {
          cancel: "إلغاء الامر",
          fill: "املأ كل الخلايا بـ <i>%d</i>",
          fillHorizontal: "تعبئة الخلايا أفقيًا",
          fillVertical: "تعبئة الخلايا عموديا",
        },
        decimal: ",",
        infoFiltered: "(مرشحة من مجموع _MAX_ مُدخل)",
      },
    });
  }

  // Flat Date picker
  if (dt_date_table.length) {
    dt_date_table.flatpickr({
      monthSelectorType: "static",
      dateFormat: "m/d/Y",
    });
  }
});
