$(document).ready(function () {
    let password = $('form').find('input[type = "password"]').not('.password_ignore').first()
    let password_confirm = $(password).parents().find('input[type = "password"]').not($(password)).not('.password_ignore').first()
    $(password).addClass('nextdoor_password_validation')
    $(password_confirm).addClass('nextdoor_password_confirm_validation')
    load_password_function()
});

function load_password_function() {
    $('.nextdoor_password_validation').focusin(function () {
        $('.nextdoor_password_validation').attr('onblur', 'form_password_blur(this)')
        let tooltips = $(this).siblings('.invalid-tooltip')
        if (tooltips.length == 0)
            render_append_element("/load/password_tooltips", $('.nextdoor_password_validation').parent()) // Load tooltips element...
        $(tooltips).addClass('show-pw-tooltip')
        $(tooltips).removeClass('hide-pw-tooltip')
        nextdoor_validation_input_control(this, true)
        $(this).siblings('.invalid-feedback').addClass('hide-pw-tooltip')
    })
    $('.nextdoor_password_validation').keyup(function () {
        let data = $(this).val()
        let tooltips = $(this).siblings('.invalid-tooltip')
        let result = form_password_validation(tooltips, data)
        nextdoor_validation_input_control(this, result)
        $(this).siblings('.invalid-feedback').text('Please provide a valid password.')
    })
    $('.nextdoor_password_confirm_validation').blur(function () {
        let data = $(this).val()
        let pw = $('.nextdoor_password_validation').val()
        if (pw === null || pw === '') {
            nextdoor_validation_input_control(this, false)
            $(this).siblings('.invalid-feedback').text('Please provide a password in the Password field.')
        }
        else if ($('.nextdoor_password_validation').hasClass('is-invalid')) {
            nextdoor_validation_input_control(this, false)
            $(this).siblings('.invalid-feedback').text('Please match the format in the Password field.')
        }
        else if (data === null || data === '') {
            nextdoor_validation_input_control(this, false)
            $(this).siblings('.invalid-feedback').text('Please confirm the password.')
        }
        else if (data !== pw) {
            nextdoor_validation_input_control(this, false)
            $(this).siblings('.invalid-feedback').text('Password does not match.')
        }
        else
            nextdoor_validation_input_control(this, true)
    })
}

function form_password_blur(element) {
    let data = $(element).val()
    let tooltips = $(element).siblings('.invalid-tooltip')
    $(tooltips).removeClass('show-pw-tooltip')
    $(tooltips).addClass('hide-pw-tooltip')
    let result = form_password_validation(tooltips, data)
    nextdoor_validation_input_control(element, result)
    $(element).siblings('.invalid-feedback').text('Please provide a valid password.')
    $(element).siblings('.invalid-feedback').removeClass('hide-pw-tooltip')
}

function form_password_validation(element, data) {
    let symbol_regx = /[\'^£$%&*()}{@#~?><>,|=_+¬-]/
    let lowercase_regx = /[a-z]/
    let uppercase_regx = /[A-Z]/
    let digit_regx = /[0-9]/

    // Sentences id
    let length = $(element).find('#pw-length')
    let symbol = $(element).find('#pw-symbol')
    let uppercase = $(element).find('#pw-uppercase')
    let lowercase = $(element).find('#pw-lowercase')
    let number = $(element).find('#pw-number')

    let num_invalid = 0

    if (data.length >= 12 && data.length <= 16)
        $(length).addClass('pw-sentence-isvalid')
    else {
        $(length).removeClass('pw-sentence-isvalid')
        num_invalid++
    }

    if (symbol_regx.test(data))
        $(symbol).addClass('pw-sentence-isvalid')
    else {
        $(symbol).removeClass('pw-sentence-isvalid')
        num_invalid++
    }

    if (uppercase_regx.test(data))
        $(uppercase).addClass('pw-sentence-isvalid')
    else {
        $(uppercase).removeClass('pw-sentence-isvalid')
        num_invalid++
    }

    if (lowercase_regx.test(data))
        $(lowercase).addClass('pw-sentence-isvalid')
    else {
        $(lowercase).removeClass('pw-sentence-isvalid')
        num_invalid++
    }

    if (digit_regx.test(data))
        $(number).addClass('pw-sentence-isvalid')
    else {
        $(number).removeClass('pw-sentence-isvalid')
        num_invalid++
    }

    if (num_invalid > 0)
        return false
    else
        return true
}

function nextdoor_validation_input_control(element, result) {
    let validation_element = $(element).siblings('.invalid-feedback').first()
    let validation_exist = validation_element.length ? true : false
    let offset
    if ($(element).siblings('label').length > 0)
        offset = $(element).siblings('label').attr('class').substring(4, 5)
    else if ($(element).parents().children('label').first().length > 0)
        offset = 0

    if (result) {
        if (validation_exist) {
            $(element).removeClass('is-invalid')
        }
        else {
            $(element).parent().append(`
                    <div style="flex-shrink: inherit; width: -webkit-fill-available;" class="invalid-feedback offset-`+ offset + `"></div>`)
            $(element).removeClass('is-invalid')
        }
    }
    else {
        if (validation_exist) {
            $(element).addClass('is-invalid')
        }
        else {
            $(element).parent().append(`
                    <div style="flex-shrink: inherit; width: -webkit-fill-available;" class="invalid-feedback offset-`+ offset + `"></div>`)
            $(element).addClass('is-invalid')
        }
    }
}

function form_validation_ajax(data) {
    let default_property = {
        element: null,
        ajax_url: null,
        ajax_error: "This value has been recorded in database."
    }
    let merge_data = { ...default_property, ...data }

    if (!form_validation(data))
        return false

    $.ajax({
        type: 'POST',
        url: merge_data.ajax_url,
        data: {
            data: $(merge_data.element).val()
        },
        success: function (data) { // Successfully passing data into respective function
            if (data === 'true')
                result = true
            else
                result = false
            nextdoor_validation_input_control(merge_data.element, result)
            $(merge_data.element).siblings('.invalid-feedback').text(merge_data.ajax_error)
        },
        error: function (data) { // Fail
            console.log(data)
        }
    })
}

function form_validation(data) {
    let default_property = {
        is_required: true,
        element: null,
        regx: null,
        error_regx: 'Please match the requested format.',
        error_required: 'Please fill in this field.'
    }
    let merge_data = { ...default_property, ...data }

    let value = $(merge_data.element).val()
    if (merge_data.is_required) {
        result = (value == '' || value == null) ? false : true
        nextdoor_validation_input_control(merge_data.element, result)
        if (!result) {
            $(merge_data.element).siblings('.invalid-feedback').text(merge_data.error_required)
            return false
        }
    }
    
    if (merge_data.regx != null) {
        let regx = merge_data.regx
        if (regx === 'email') {
            regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }
        else if (regx === 'phone_number') {
            regx = /^(\+?1)[02-46-9]-*[0-9]{7}$|^(\+?1)[1]-*[0-9]{8}$/
        }
        if (regx.test(value)) {
            nextdoor_validation_input_control(merge_data.element, true)
        }
        else {
            $(merge_data.element).siblings('.invalid-feedback').text(merge_data.error_regx)
            nextdoor_validation_input_control(merge_data.element, false)
            return false
        }
    }

    return true
}

function form_submission(element) {
    my_form = $(element).parents('form').first()

    $(my_form).find(':input').each(function () {
        $(this).trigger('keyup');
        $(this).trigger('blur');
    })

    error_length = $('.is-invalid').length

    if (error_length == 0) {
        $(my_form).submit()
    }
}

function showPassword(element) {
    user_password = $(element).closest("div").parent().children("input");
    password_icon = $(element);
    
    // toggle type attribute
    // if the current type is password, set it to text, else set it to password type
    if(user_password.attr('type') === 'password')
    {
        type = 'text';
    }
    else
    {
        type = 'password';
    }

    user_password.attr('type', type);

    // toggle the eye + eye-slash icon
    password_icon.toggleClass('fa-eye');
    password_icon.toggleClass('fa-eye-slash');

}

/*Preview Image*/
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#myimage').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

