
from rest_framework.routers import DefaultRouter
from .views import (
    ClienteViewSet,
    VeiculoViewSet,
    FuncionarioViewSet,
    OrdemServicoViewSet,
)

router = DefaultRouter()

router.register('clientes', ClienteViewSet)
router.register('veiculos', VeiculoViewSet)
router.register('funcionarios', FuncionarioViewSet)
router.register('ordens-servico', OrdemServicoViewSet)

urlpatterns = router.urls