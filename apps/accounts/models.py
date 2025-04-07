from django.db import models
from apps.core.models import ClientDeliverable # Import the real model

# Create your models here.

class ClientDeliverableAdminView(ClientDeliverable):
    """Proxy model to register ClientDeliverable under the Accounts app admin section."""
    class Meta:
        proxy = True
        verbose_name = "Client Deliverable"