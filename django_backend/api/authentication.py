"""
Custom authentication for the portfolio API
"""
from rest_framework.authentication import TokenAuthentication as BaseTokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import PortfolioUser


class TokenAuthentication(BaseTokenAuthentication):
    """Custom token authentication"""
    
    def authenticate_credentials(self, key):
        try:
            portfolio_user = PortfolioUser.objects.get(token=key)
            return (portfolio_user.user, key)
        except PortfolioUser.DoesNotExist:
            raise AuthenticationFailed('Invalid token.')
    
    def authenticate(self, request):
        auth = request.META.get('HTTP_AUTHORIZATION', '').split()
        
        if not auth or auth[0].lower() != 'bearer':
            return None
        
        if len(auth) == 1:
            raise AuthenticationFailed('Invalid token header.')
        
        if len(auth) > 2:
            raise AuthenticationFailed('Invalid token header.')
        
        return self.authenticate_credentials(auth[1])
