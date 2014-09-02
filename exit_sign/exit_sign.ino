int led = 7;

void setup() {
  Serial.begin(9600);
  pinMode(led, OUTPUT);
}

void loop() {
}

void serialEvent() {
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    if (inChar == 'a') {
      digitalWrite(led, HIGH);   
    } else if (inChar == 'b') {
      digitalWrite(led, LOW); 
    }
  }
}


