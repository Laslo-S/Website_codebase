from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.

class HomePageView(TemplateView):
    template_name = "core/home.html" # Note: Corrected path according to Django convention

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Architectural Visualization Showcase" # Example context
        # Add other context data as needed later
        return context
