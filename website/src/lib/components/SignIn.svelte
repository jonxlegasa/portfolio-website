<script lang="ts">
	import { OAuthService } from '../utils/custom-api-calls/oauthservice';

	async function handleGoogleSignIn(event: Event) {
		event.preventDefault();
		try {
			const response: any = await OAuthService.googleAuthorize(['profile', 'email']);
			const authorizationUrl = response.authorizationUrl;
			window.location.href = authorizationUrl;
		} catch (error) {
			console.error('Google Sign-In failed', error);
		}
	}
</script>
