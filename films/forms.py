from django.forms import ModelForm, Form
from .models import Movie, Vote
from django import forms


class MovieModelForm(ModelForm):
    class Meta:
        model = Movie
        fields = ["title", "director",
                  "production_year", "description", "poster"]


class MovieVoteValueForm(ModelForm):
    class Meta:
        model = Vote
        fields = ['value']


CHOICES = (
    ('1', 'one'),
    ('2', 'two')
)


class MovieModelForm2(forms.Form):
    check_field = forms.ChoiceField(
        widget=forms.RadioSelect, choices=CHOICES)
    text_field = forms.CharField(widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'enter something',
        'id': 'text_field'
    }
    ))

