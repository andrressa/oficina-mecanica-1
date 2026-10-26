from django.contrib import admin

# Register your models here.
from .models import Cliente, Veiculo, Funcionario, OrdemServico

admin.site.register(Cliente)
admin.site.register(Veiculo)
admin.site.register(Funcionario)
admin.site.register(OrdemServico)