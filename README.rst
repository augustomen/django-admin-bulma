django-admin-bulma
==================

A `Bulma <https://bulma.io/>`_-powered theme for Django admin.

Currently written for (and only supporting) Django 4.0+.

Quick start
-----------

1. Install the package::

    pip install django-admin-bulma

2. Add this package to your ``INSTALLED_APPS`` before ``django.contrib.admin``, like this::

    INSTALLED_APPS = [
        'django_admin_bulma',
        'django.contrib.admin',
        ...
    ]

3. Add a context processor to your ``TEMPLATES`` settings::

    TEMPLATES = [
        {
            ...
            'OPTIONS': {
                'context_processors': [
                    ...
                    'django_admin_bulma.context_processors.bulma_settings',
                ],
            },
        },
    ]

4. Add or change the following settings::

    from django.contrib.messages import constants
    MESSAGE_TAGS = {
        constants.DEBUG: '',
        constants.INFO: 'is-info',
        constants.WARNING: 'is-warning',
        constants.SUCCESS: 'is-success',
        constants.ERROR: 'is-danger',
    }


Notes
-----

django-admin-bulma doesn't come with its own distribution of Bulma or FontAwesome. Instead, by default it will use
common CDNs to obtain these files, and these may clash with your ``Content-Security-Policy``, so you can add lines
in your settings file to change the default locations::

    ADMIN_BULMA_URL = 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css'
    ADMIN_FONTAWESOME_URL = 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.1/css/all.min.css'

Optionally, you may decide to write your own context processor and provide the variables ``bulma_css`` and
``fontawesome_url``.

To do
-----

- Customize Bulma classes in elements
- Provide more ways of customizing
- Dark mode
