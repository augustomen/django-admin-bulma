from django.conf import settings

from . import default_settings


def bulma_settings(request):
    bulma_url = getattr(settings, 'ADMIN_BULMA_URL', default_settings.ADMIN_BULMA_URL)
    fontawesome_url = getattr(settings, 'ADMIN_FONTAWESOME_URL', default_settings.ADMIN_FONTAWESOME_URL)
    return {
        'bulma_url': bulma_url,
        'fontawesome_url': fontawesome_url,
    }
