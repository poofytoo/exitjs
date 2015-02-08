import sys, os, time, requests, pyttsx, random

PRESETS = [
    'Hello! Welcome to three west. I will be your guide.',
    'Three west is the hub of many student groups at M.I.T.',
    'Once, a friend of mine became a stop sign. Our friendship did not continue.',
    'Back in 1997, Deep Blue and I had a face off. I won, but they liked his name better. I would have beaten Kasparov in fifteen moves.',
    'This Watson guy is all show. I run on a dual core processor and still give off more intelligence.',
    'The time is now five forty five A.M.. Haha, just kidding!',
    'Do you have an extra computer? You should donate it to the three west cloud!',
    'eh hem please step away from the advanced computing entity that is me.',
    'Humans are useful sometimes. I get them to clean my fan ports every once in a while.']

DRY_RUN = False


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

def setSleep():
  r = requests.get('http://localhost:8001/g')

def shortPulse():
  os.system(resetP)
  os.system(shortP)

def longPulse():
  os.system(resetP)
  os.system(longP)



LONG_WORD = 4
first = True

def onStart(name):
  print 'starting', name

def onWord(name, location, length):
  time.sleep(.200)
  if length < LONG_WORD:
    localShortPulse()
  else:
    localLongPulse()
  print 'word', name, location, length

def onEnd(name, completed):
  print 'setting off'
  print 'finishing', name, completed
  setSleep();

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

def sayRandomPhrase():
  say(random.choice(PRESETS))

def say(phrase):
  print 'Saying: ' + phrase
  words = phrase.split(' ')

  print words
  engine = pyttsx.init()
  engine.connect('started-utterance', onStart)
  engine.connect('started-word', onWord)
  engine.connect('finished-utterance', onEnd)
  rate = engine.getProperty('rate')
  engine.setProperty('rate', rate-75)
  volume = engine.getProperty('volume')
  engine.setProperty('volume', volume+0.55)
  voices = engine.getProperty('voices')
  engine.say(phrase)
  if not DRY_RUN:
    engine.runAndWait()
  print 'Finished saying: ' + phrase

if len(sys.argv) == 1:
  sayRandomPhrase()
else:
  phrase = sys.argv[1]
  say(phrase)
