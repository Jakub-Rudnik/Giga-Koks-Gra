# 🎮 Giga Koks Gra

Frontend - czysty js <br>
Server - socket.io
<br>
<br>
# Zasady:
   1. Tryb duel (zakres 1-100; w przypadku remisu 1-50):
      * Musisz podać większą liczbę niż twój przeciwnik.
      * Żeby dostac punkt pomiędzy twoją odpowiedzią a odpowiedzią przeciwnika nie może być większej różnicy niż 15 - w innym przypadku tracisz punkty.
      * Gierka trwa trzy rundy, wynik zostaje pokazany dopiero po ostatniej!
      <br>
   2. Wskazówki dla użytkownika i programisty:)
      * jeśli liczby w zakresie *abs(a-b) <= 15* to wygrany otrzymuje: plus 0,1 punkta za kazdy punkt blizej 
         <br>np.: 40vs45 da 2 punkty (1 + 0,1 * (15-10)).
      * jeśli rozbieżność pomiędzy odpowiedziami jest większa niż 15 to otrzymuje: -(0,wybranaliczba),
         <br>np.: strzał użytownika liczba 72 i przegrał => traci 0,72pkt.
      * w przypadku rozbieżność punkty traci tylko ten, którego strzał był większy.
      * można wybrac samemu liczbę (w przypadku nie wybrania maszyna losuje).
      * ok. 10 sekund jedna runda.
      * gra sie w pokojach (trzeba podac 6literowocyfrowy kod), po skonczonej gierce mozliwosc rematchu:D
      <br>
   3. Pomysły ponad podstawkę:
      * (Ewentualnie) tryb kolejki, jak w innych gierkach wchodzisz do kolejki i szuka ci przeciwnika
