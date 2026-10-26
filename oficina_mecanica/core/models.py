
from django.db import models


class Cliente(models.Model):
    nome = models.CharField(max_length=150)
    cpf = models.CharField(max_length=14, unique=True)
    telefone = models.CharField(max_length=20)
    email = models.EmailField(blank=True)

    def __str__(self):
        return self.nome


class Veiculo(models.Model):
    cliente = models.ForeignKey(
        Cliente,
        on_delete=models.CASCADE,
        related_name='veiculos'
    )
    placa = models.CharField(max_length=10, unique=True)
    marca = models.CharField(max_length=50)
    modelo = models.CharField(max_length=50)
    ano = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.placa} - {self.marca} {self.modelo}'


class Funcionario(models.Model):
    nome = models.CharField(max_length=150)
    cargo = models.CharField(max_length=100)
    telefone = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f'{self.nome} - {self.cargo}'


class OrdemServico(models.Model):
    STATUS_CHOICES = [
        ('ABERTA', 'Aberta'),
        ('EM_ANDAMENTO', 'Em andamento'),
        ('CONCLUIDA', 'Concluída'),
        ('CANCELADA', 'Cancelada'),
    ]

    veiculo = models.ForeignKey(
        Veiculo,
        on_delete=models.CASCADE,
        related_name='ordens_servico'
    )
    funcionario = models.ForeignKey(
        Funcionario,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='ordens_servico'
    )
    descricao = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='ABERTA'
    )
    valor = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )
    data_abertura = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'OS {self.id} - {self.veiculo.placa}'