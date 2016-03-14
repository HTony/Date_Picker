/**
 * Created by Zhiming on 2016-03-13.
 */
'use strict'

var tool = {
    longMonth: [1,3,5,7,8,10,12],
    shortMonth: [4,6,9,11],

    getNumberOfMonth: function(month, year) {
        if (this.longMonth.indexOf(month) > 0) {
            return 31;
        } else if (this.shortMonth.indexOf(month) > 0) {
            return 30;
        } else if (year%4 == 0 && year%100 != 0 || year%400 == 0) {
            return 29;
        } else {
            return 28;
        }
    }
};

var DatePicker = function(datePicker) {
    if (typeof datePicker !== 'string') {
        return false;
    }

    this.datePicker = document.getElementById(datePicker);
    this.dateLabel = this.datePicker.querySelector('.date-picker-label');
    this.datePickerBox = this.datePicker.querySelector('.date-picker-box');
    this.datePickerBox.style.display = "none";
    this.dateElements = {
        year: this.datePickerBox.querySelector('.date-year'),
        month: this.datePickerBox.querySelector('.date-month'),
        day: this.datePickerBox.querySelector('.date-day'),
        confirm: this.datePickerBox.querySelector('.date-confirm')
    };

    // option template
    this.optTpl = {
        normal: '<option>{$v}</option>',
        selected: '<option selected>{$v}</option>'
    };
    // get current date
    this.dateObj = new Date();
    this.today = {
        year: this.dateObj.getFullYear(),
        month: this.dateObj.getMonth() + 1,
        day: this.dateObj.getDate()
    };
    // initialize the picker box
    this.fillPickerBoxes();
    // bind events
    this.bind();
}

DatePicker.prototype = {

    togglePickerBox: function() {
        this.datePickerBox.style.display = this.datePickerBox.style.display !== 'none' ? 'none' : 'block';
    },

    fillPickerLabel: function(ele) {
        this.dateLabel.value = ele.year + '-' + ele.month + '-' + ele.day;
    },

    fillSelect: function(ele, start, end, selected) {
        var tmp = [];
        for (var i = start; i <= end; i++) {
            var cur = i === selected ? this.optTpl.selected : this.optTpl.normal;
            tmp.push(cur.replace('{$v}', i));
        }
        ele.innerHTML = tmp.join('\n');
    },

    fillPickerBoxes: function() {
        this.fillSelect(this.dateElements.year, this.today.year-99, this.today.year, this.today.year);
        this.fillSelect(this.dateElements.month, 1, 12, this.today.month);
        this.fillSelect(this.dateElements.day, 1, tool.getNumberOfMonth(this.today.month, this.today.year), this.today.day);
    },

    bind: function() {
        var _this = this;

        _this.dateLabel.onclick = function() {
            _this.togglePickerBox();
        };

        _this.dateElements.confirm.onclick = function() {
            _this.fillPickerLabel({
                year: _this.dateElements.year.value,
                month: _this.dateElements.month.value,
                day: _this.dateElements.day.value
            });
            _this.togglePickerBox();
        };

        _this.dateElements.year.onchange = _this.dateElements.month.onchange = function() {
            var y = parseInt(_this.dateElements.year.value, 10);
            var m = parseInt(_this.dateElements.month.value, 10);
            _this.fillSelect(_this.dateElements.day, 1, tool.getNumberOfMonth(m, y), 1);
        }
    }
};

new DatePicker('first-one');