from django.db import models

# Create your models here.
class Portfolio(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    data = models.JSONField()
    like_count = models.PositiveBigIntegerField(default=0)
    view_count = models.PositiveBigIntegerField(default=0)
    img_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
class User_portfolio(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE)
    data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s portfolio: {self.portfolio.title}"
    
class Saved_like(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    saved = models.ForeignKey(Portfolio,on_delete=models.CASCADE)
    liked = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name='liked_by')
    created_at = models.DateTimeField(auto_now_add=True)    
    updated_at = models.DateTimeField(auto_now=True) 