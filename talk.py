import sys, os, time, requests, pyttsx

shortP = '''curl -X PUT -d '{"val":"e"}' https://poofytoo.firebaseio.com/exitsign.json'''
longP = '''curl -X PUT -d '{"val":"f"}' https://poofytoo.firebaseio.com/exitsign.json'''
resetP = '''curl -X PUT -d '{"val":"z"}' https://poofytoo.firebaseio.com/exitsign.json'''

def localShortPulse():
	r = requests.get('http://localhost:8001/e')

def localLongPulse():
	r = requests.get('http://localhost:8001/f')

def setOn():
	r = requests.get('http://localhost:8001/a')

def setOff():
	r = requests.get('http://localhost:8001/b')

def shortPulse():
	os.system(resetP)
	os.system(shortP)

def longPulse():
	os.system(resetP)
	os.system(longP)

phrase = sys.argv[1]

words = phrase.split(' ')

print words

LONG_WORD = 4
first = True

def onStart(name):
	print 'starting', name

def onWord(name, location, length):
	print 'woot'
	if length < LONG_WORD:
		localShortPulse()
	else:
		localLongPulse()
	print 'word', name, location, length

def onEnd(name, completed):
	localLongPulse()
	print 'setting off'
	print 'finishing', name, completed

'''
for word in words:
	if len(word) < LONG_WORD:
		localShortPulse()
	else:
		localLongPulse()

	if first:
		time.sleep(.055)
		first = False
	os.system('espeak ' + word)
'''


engine = pyttsx.init()
engine.connect('started-utterance', onStart)
engine.connect('started-word', onWord)
engine.connect('finished-utterance', onEnd)
rate = engine.getProperty('rate')
engine.setProperty('rate', rate-70)
volume = engine.getProperty('volume')
engine.setProperty('volume', volume+0.55)
engine.say(phrase)
engine.runAndWait()
