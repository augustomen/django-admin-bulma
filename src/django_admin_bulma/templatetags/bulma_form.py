import re
from django import forms
from django import template
from django.template.loader import get_template
from django.utils.safestring import mark_safe

register = template.Library()


TAG_PATTERN = re.compile(r'''\<[\w\-]+()[\s\>]''', flags=re.I)
CLASS_PATTERN = re.compile(r'''\bclass=["']([^"']*)["']''', flags=re.I)


@register.simple_tag
def bulma_field(field, horizontal=False, **kwargs):
    """Renders a Django form field (including the ``<div class="field">`` tag).

    See the comments below for accepted kwargs.
    """
    if horizontal:
        template = get_template('django_admin_bulma/field_horizontal.html')
    else:
        template = get_template('django_admin_bulma/field.html')
    context = {
        'field': field,
        'control_class': '',  # Extra control classes.
        'is_expanded': False,  # Renders the control with the "is-expanded" class.
        'icon_left': None,  # Adds the icon class to the left of the input (eg. "fas fa-envelope").
        'icon_right': None,  # Adds the icon class to the right of the input (eg. "fas fa-check").
        'placeholder': None,  # Overrides the placeholder.
    }
    context.update(**kwargs)
    return template.render(context)


@register.filter(name='add_class')
def add_class(field, new_classes):
    """Adds HTML classes to a field, if not there yet."""
    rendered = str(field)
    match = CLASS_PATTERN.search(rendered)
    if match:
        # Found the
        css_classes = match.group(1).split()
        new_classes = new_classes.split()
        for new_class in new_classes:
            if new_class not in css_classes:
                css_classes.append(new_class)
        css_classes = ' '.join(css_classes)
        start, end = match.span(1)  # start and end of classes
        return mark_safe(f'{rendered[:start]}{css_classes}{rendered[end:]}')

    # no 'class' attribute, add one to the first available tag
    match = TAG_PATTERN.search(rendered)
    if match:
        start, end = match.span(1)
        return mark_safe(f'{rendered[:start]} class="{new_classes}"{rendered[end:]}')

    # no tags to add classes to
    return rendered


@register.filter
def is_checkbox(field):
    """Returns True if the field is a checkbox."""
    return isinstance(field.field.widget, forms.CheckboxInput)


@register.filter
def is_textinput(field):
    """Returns True if a widget is any sort of text input."""
    return isinstance(field.field.widget, (
        forms.TextInput,
        forms.NumberInput,
        forms.EmailInput,
        forms.PasswordInput,
        forms.URLInput,
    ))
