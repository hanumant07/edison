import twython
import sys
import subprocess

app_key = "XXX"
app_secret = "XXX"
oauth_token = "XXX"
oauth_token_secret = "XXX"

client_args = {
    'verify': False
}


twitter = twython.Twython(app_key, app_secret, oauth_token, oauth_token_secret, client_args=client_args)

twitter.verify_credentials()
pic = sys.argv[1]
print(pic)
try:

	f = open(pic, 'rb')
except IOError:
	print "Error: can't find or open file"
else:
	# Tweeting picture
	twitter.update_status_with_media(
		status = "jarvis detected motion in workspace2",
		media = f
	)

subprocess.call(["mplayer", "/home/jarvis/alarm/audio/pic_posted.m4a"]);

  
