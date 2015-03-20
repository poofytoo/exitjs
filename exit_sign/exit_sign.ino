int led = 3;
int ledA = 13;
int sweep = 100;
int dir = 1;
char inChar;
int val = 0;
int buttonHold = 0;

int easyRead = 5;

void setup() {
  Serial.begin(9600);
  pinMode(led, OUTPUT);
  pinMode(ledA, OUTPUT);
  pinMode(easyRead, INPUT);

}

void loop() {
  val = digitalRead(easyRead);
   if (val == 0) {
     if (buttonHold <= 3) {
     buttonHold += 1;
     }
     if (buttonHold == 4) {
       Serial.write('0');
       buttonHold = 10;
       delay(1000);
     }
   } else {
     buttonHold = 0;
   }
  
  if (inChar == 'c') {
      analogWrite(led, sweep);
      analogWrite(ledA,sweep);
      sweep += dir;
      delay(2);
      if (sweep > 255 || sweep < 0) {
        dir *= -1;
        sweep += dir;
      } 
  } else if (inChar == 'd') {
      digitalWrite(led, HIGH);
      digitalWrite(ledA, HIGH);
      delay(40);
      digitalWrite(led, LOW);
      digitalWrite(ledA,LOW);
      delay(40);
  } else if (inChar == 'g') {
      analogWrite(led, sweep); 
      analogWrite(ledA,sweep);
      sweep += dir;
      delay(10);
      if (sweep > 255 || sweep < 0) {
        dir *= -1;
        sweep += dir;
      } 
  } else if (inChar == 'h') {
      analogWrite(led, sweep);
      analogWrite(ledA, sweep);
      sweep += dir;
      delay(100);
      if (sweep > 255 || sweep < 0) {
        dir *= -1;
        sweep += dir;
      } 
  }
}

void serialEvent() {
  if (Serial.available()) {
    inChar = (char)Serial.read();
    if (inChar == 'a') {  
      digitalWrite(led, HIGH); 
      digitalWrite(ledA, HIGH);
    } else if (inChar == 'b') {
      digitalWrite(led, LOW); 
      digitalWrite(ledA, LOW);
    } else if (inChar == 'e') {
      digitalWrite(led, HIGH);  
      digitalWrite(ledA,HIGH);
      delay(40);
      digitalWrite(led, LOW);
      digitalWrite(ledA, LOW);
    } else if (inChar == 'f') {
      digitalWrite(led, HIGH);  
      digitalWrite(ledA,HIGH);
      delay(200);
      digitalWrite(led, LOW);  
      digitalWrite(ledA, LOW);
    }   
  }
}


