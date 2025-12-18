(function ($) {
    'use strict';
    var form = $('.contact-form'),
        message = $('.messenger-box-contact__msg'),
        requiredMsg = $('#required-msg');

    // Email validation function
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Success function
    function done_func(response) {
        message.fadeIn().removeClass('alert-danger').addClass('alert-success');
        message.text(response);
        setTimeout(function () {
            message.fadeOut();
        }, 5000);
        form.find('input:not([type="submit"]), textarea').val('');
        form.find('input[type="file"]').val('');

        // Remove any invalid classes
        form.find('.invalid').removeClass('invalid');
    }

    // Fail function
    function fail_func(data) {
        message.fadeIn().removeClass('alert-success').addClass('alert-danger');
        message.text(data.responseText || 'Oops! Something went wrong. Please try again.');
        setTimeout(function () {
            message.fadeOut();
        }, 5000);
    }

    // Form validation
    form.submit(function (e) {
        e.preventDefault();

        const fullName = $('#full-name');
        const email = $('#email');
        const subject = $('#subject');
        const submitBtn = $('#submit-form');

        // Reset invalid states
        form.find('.invalid').removeClass('invalid');
        requiredMsg.removeClass('show');

        let isValid = true;

        // Validate full name
        if (!fullName.val().trim()) {
            fullName.addClass('invalid');
            isValid = false;
        }

        // Validate email
        if (!email.val().trim() || !isValidEmail(email.val().trim())) {
            email.addClass('invalid');
            isValid = false;
        }

        // Validate subject
        if (!subject.val().trim()) {
            subject.addClass('invalid');
            isValid = false;
        }

        // Show error message if validation fails
        if (!isValid) {
            requiredMsg.addClass('show');
            return false;
        }

        // Hide required message
        requiredMsg.removeClass('show');

        // Disable submit button to prevent multiple submissions
        submitBtn.prop('disabled', true).text('Sending...');

        // Handle file upload with FormData
        var formData = new FormData(this);

        $.ajax({
            type: 'POST',
            url: '/api/contact',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                const message = response.message || response;
                done_func(message);
                submitBtn.prop('disabled', false).text('send message');
            },
            error: function(data) {
                fail_func(data);
                submitBtn.prop('disabled', false).text('send message');
            }
        });
    });

    // Real-time validation on blur
    $('#full-name, #email, #subject').on('blur', function() {
        var $this = $(this);
        $this.removeClass('invalid');

        if (!$this.val().trim()) {
            $this.addClass('invalid');
        } else if ($this.attr('id') === 'email' && !isValidEmail($this.val().trim())) {
            $this.addClass('invalid');
        }
    });

    // Remove invalid class on input
    $('#full-name, #email, #subject').on('input', function() {
        $(this).removeClass('invalid');
        requiredMsg.removeClass('show');
    });

})(jQuery);