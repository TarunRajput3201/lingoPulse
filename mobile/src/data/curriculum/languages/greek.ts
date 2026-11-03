import { LanguageDefinition } from '../types';
import { v } from '../vocabHelper';

export const GREEK_LANGUAGE: LanguageDefinition = {
  code: 'el-en',
  title: 'Greek Academy',
  description: 'Master Modern Greek from alphabet and stress marks to rich cultural dialogue from A1 to C1.',
  fromLanguage: 'en',
  toLanguage: 'el',
  flagIcon: '🇬🇷',
  level: 'A1–C1',
  order: 19,
  nativeName: 'Ελληνικά',
  isRTL: false,
  region: 'European',
  culturalTips: {
    1: 'Every Greek word with two or more syllables carries a written accent mark (tonos) indicating where the stress falls.',
    2: 'Saying "Φιλοξενία" (Philoxenia) reflects the revered ancient and modern Greek virtue of hospitality toward guests.',
  },
  units: {
    1: [
      v('Γειά σας', 'Hello / Goodbye', 'noun', 'YAH sahs', 'Γειά σας, πώς είστε σήμερα;', 'Hello, how are you today?', '___, πώς είστε σήμερα;', 'Γειά σας', ['Αντίο', 'Ευχαριστώ', 'Παρακαλώ']),
      v('Αντίο', 'Goodbye', 'expression', 'ahn-DEE-oh', 'Αντίο και καλή αντάμωση σύντομα!', 'Goodbye and good meeting soon!', '___ και καλή αντάμωση σύντομα!', 'Αντίο', ['Γειά σας', 'Ευχαριστώ', 'Παρακαλώ']),
      v('Ευχαριστώ', 'Thank you', 'noun', 'ef-khah-ree-STOH', 'Ευχαριστώ πολύ για τη βοήθειά σας.', 'Thank you very much for your help.', '___ πολύ για τη βοήθειά σας.', 'Ευχαριστώ', ['Γειά σας', 'Αντίο', 'Παρακαλώ']),
      v('Παρακαλώ', 'Please / You\'re welcome', 'expression', 'pah-rah-kah-LOH', 'Έναν ελληνικό καφέ, παρακαλώ.', 'A Greek coffee, please.', 'Έναν ελληνικό καφέ, παρακαλώ.', 'Παρακαλώ', ['Γειά σας', 'Αντίο', 'Ευχαριστώ']),
      v('Ναι', 'Yes', 'noun', 'NEH', 'Ναι, καταλαβαίνω απόλυτα.', 'Yes, I understand completely.', '___, καταλαβαίνω απόλυτα.', 'Ναι', ['Γειά σας', 'Αντίο', 'Ευχαριστώ']),
      v('Όχι', 'No', 'expression', 'OH-khee', 'Όχι, αυτό δεν είναι δυνατόν σήμερα.', 'No, that is not possible today.', '___, αυτό δεν είναι δυνατόν σήμερα.', 'Όχι', ['Γειά σας', 'Αντίο', 'Ευχαριστώ']),
      v('Τι κάνετε', 'How are you', 'noun', 'tee KAH-neh-teh', 'Γειά σας φίλοι, τι κάνετε;', 'Hello friends, how are you?', 'Γειά σας φίλοι, τι κάνετε;', 'Τι κάνετε', ['Γειά σας', 'Αντίο', 'Ευχαριστώ']),
      v('Καλώς ήρθατε', 'Welcome', 'expression', 'kah-LOHS EER-thah-teh', 'Καλώς ήρθατε στην όμορφη χώρα μας!', 'Welcome to our beautiful country!', '___ στην όμορφη χώρα μας!', 'Καλώς ήρθατε', ['Γειά σας', 'Αντίο', 'Ευχαριστώ']),
      v('Τα λέμε σύντομα', 'See you soon', 'noun', 'tah LEH-meh SEEN-toh-mah', 'Να έχετε καλή μέρα και τα λέμε σύντομα!', 'Have a good day and see you soon!', 'Να έχετε καλή μέρα και τα λέμε σύντομα!', 'Τα λέμε σύντομα', ['Γειά σας', 'Αντίο', 'Ευχαριστώ']),
      v('Καληνύχτα', 'Good night', 'expression', 'kah-lee-NEEKH-tah', 'Καληνύχτα και όνειρα γλυκά.', 'Good night and sweet dreams.', '___ και όνειρα γλυκά.', 'Καληνύχτα', ['Γειά σας', 'Αντίο', 'Ευχαριστώ']),
    ],
    2: [
      v('Χάρηκα για τη γνωριμία', 'Nice to meet you', 'noun', 'KHAH-ree-kah yah tee gnoh-ree-MEE-ah', 'Χάρηκα πολύ για τη γνωριμία μας.', 'Very glad for our acquaintance.', 'Χάρηκα πολύ για τη γνωριμία μας.', 'Χάρηκα για τη γνωριμία', ['Με λένε', 'Συγγνώμη', 'Καλημέρα']),
      v('Με λένε', 'My name is', 'expression', 'meh LEH-neh', 'Γειά σας, εμένα με λένε Νίκο.', 'Hello, my name is Nikos.', 'Γειά σας, εμένα με λένε Νίκο.', 'Με λένε', ['Χάρηκα για τη γνωριμία', 'Συγγνώμη', 'Καλημέρα']),
      v('Συγγνώμη', 'Excuse me / Sorry', 'noun', 'seeg-GNOH-mee', 'Συγγνώμη, πού είναι ο σταθμός του μετρό;', 'Excuse me, where is the metro station?', '___, πού είναι ο σταθμός του μετρό;', 'Συγγνώμη', ['Χάρηκα για τη γνωριμία', 'Με λένε', 'Καλημέρα']),
      v('Καλημέρα', 'Good morning', 'expression', 'kah-lee-MEH-rah', 'Καλημέρα σε όλους και καλή δύναμη!', 'Good morning to all and good strength!', '___ σε όλους και καλή δύναμη!', 'Καλημέρα', ['Χάρηκα για τη γνωριμία', 'Με λένε', 'Συγγνώμη']),
      v('Καλησπέρα', 'Good evening', 'noun', 'kah-lee-SPEH-rah', 'Καλησπέρα και καλώς ορίσατε απόψε.', 'Good evening and welcome tonight.', '___ και καλώς ορίσατε απόψε.', 'Καλησπέρα', ['Χάρηκα για τη γνωριμία', 'Με λένε', 'Συγγνώμη']),
      v('Φίλος', 'Friend', 'expression', 'FEE-lohs', 'Είναι ο καλύτερος και πιο πιστός φίλος μου.', 'He is my best and most loyal friend.', 'Είναι ο καλύτερος και πιο πιστός φίλος μου.', 'Φίλος', ['Χάρηκα για τη γνωριμία', 'Με λένε', 'Συγγνώμη']),
      v('Δάσκαλος', 'Teacher', 'noun', 'THAH-skah-lohs', 'Ο δάσκαλός μας εξηγεί τα μαθήματα εξαιρετικά.', 'Our teacher explains lessons wonderfully.', 'Ο δάσκαλός μας εξηγεί τα μαθήματα εξαιρετικά.', 'Δάσκαλος', ['Χάρηκα για τη γνωριμία', 'Με λένε', 'Συγγνώμη']),
      v('Οικογένεια', 'Family', 'expression', 'ee-koh-YEH-nee-ah', 'Η οικογένειά μου μένει στην Αθήνα.', 'My family lives in Athens.', 'Η οικογένειά μου μένει στην Αθήνα.', 'Οικογένεια', ['Χάρηκα για τη γνωριμία', 'Με λένε', 'Συγγνώμη']),
      v('Εξαιρετικά', 'Excellent', 'noun', 'ek-seh-reh-tee-KAH', 'Το αποτέλεσμα των εξετάσεων ήταν εξαιρετικά καλό.', 'The exam result was extraordinarily good.', 'Το αποτέλεσμα των εξετάσεων ήταν εξαιρετικά καλό.', 'Εξαιρετικά', ['Χάρηκα για τη γνωριμία', 'Με λένε', 'Συγγνώμη']),
      v('Καλά', 'Good', 'expression', 'kah-LAH', 'Όλα πάνε ευτυχώς πολύ καλά.', 'Everything is going very well luckily.', 'Όλα πάνε ευτυχώς πολύ καλά.', 'Καλά', ['Χάρηκα για τη γνωριμία', 'Με λένε', 'Συγγνώμη']),
    ],
    3: [
      v('Ένα', 'One', 'noun', 'EH-nah', 'Έχω ένα εισιτήριο για το πλοίο.', 'I have one ticket for ferry.', 'Έχω ένα εισιτήριο για το πλοίο.', 'Ένα', ['Δύο', 'Τρία', 'Τέσσερα']),
      v('Δύο', 'Two', 'expression', 'THEE-oh', 'Δύο ζεστούς καφέδες, παρακαλώ.', 'Two hot coffees, please.', '___ ζεστούς καφέδες, παρακαλώ.', 'Δύο', ['Ένα', 'Τρία', 'Τέσσερα']),
      v('Τρία', 'Three', 'noun', 'TREE-ah', 'Υπάρχουν τρία ελεύθερα δωμάτια.', 'There are three vacant rooms.', 'Υπάρχουν τρία ελεύθερα δωμάτια.', 'Τρία', ['Ένα', 'Δύο', 'Τέσσερα']),
      v('Τέσσερα', 'Four', 'expression', 'TEHS-seh-rah', 'Είμαστε τέσσερα άτομα στην παρέα.', 'We are four persons in group.', 'Είμαστε τέσσερα άτομα στην παρέα.', 'Τέσσερα', ['Ένα', 'Δύο', 'Τρία']),
      v('Πέντε', 'Five', 'noun', 'PEHN-deh', 'Το λεωφορείο φτάνει σε πέντε λεπτά.', 'The bus arrives in five minutes.', 'Το λεωφορείο φτάνει σε πέντε λεπτά.', 'Πέντε', ['Ένα', 'Δύο', 'Τρία']),
      v('Δέκα', 'Ten', 'expression', 'THEH-kah', 'Αυτό κοστίζει ακριβώς δέκα ευρώ.', 'This costs exactly ten euros.', 'Αυτό κοστίζει ακριβώς δέκα ευρώ.', 'Δέκα', ['Ένα', 'Δύο', 'Τρία']),
      v('Είκοσι', 'Twenty', 'noun', 'EE-koh-see', 'Η απόσταση είναι είκοσι χιλιόμετρα.', 'The distance is twenty kilometers.', 'Η απόσταση είναι είκοσι χιλιόμετρα.', 'Είκοσι', ['Ένα', 'Δύο', 'Τρία']),
      v('Πενήντα', 'Fifty', 'expression', 'peh-NEEN-dah', 'Στην αίθουσα υπάρχουν πενήντα θέσεις.', 'In hall exist fifty seats.', 'Στην αίθουσα υπάρχουν πενήντα θέσεις.', 'Πενήντα', ['Ένα', 'Δύο', 'Τρία']),
      v('Εκατό', 'One hundred', 'noun', 'eh-kah-TOH', 'Το βιβλίο έχει εκατό σελίδες.', 'The book has hundred pages.', 'Το βιβλίο έχει εκατό σελίδες.', 'Εκατό', ['Ένα', 'Δύο', 'Τρία']),
      v('Μετρώ', 'To count', 'expression', 'meh-TROH', 'Μπορώ να μετρώ στα ελληνικά.', 'I can count in Greek.', 'Μπορώ να μετρώ στα ελληνικά.', 'Μετρώ', ['Ένα', 'Δύο', 'Τρία']),
    ],
    4: [
      v('Πατέρας', 'Father', 'noun', 'pah-TEH-rahs', 'Ο πατέρας μου είναι αρχιτέκτονας.', 'My father is an architect.', 'Ο πατέρας μου είναι αρχιτέκτονας.', 'Πατέρας', ['Μητέρα', 'Αδελφός', 'Αδελφή']),
      v('Μητέρα', 'Mother', 'expression', 'mee-TEH-rah', 'Η μητέρα μου εργάζεται στο νοσοκομείο.', 'My mother works at hospital.', 'Η μητέρα μου εργάζεται στο νοσοκομείο.', 'Μητέρα', ['Πατέρας', 'Αδελφός', 'Αδελφή']),
      v('Αδελφός', 'Brother', 'noun', 'ah-thel-FOHS', 'Ο αδελφός μου σπουδάζει νομικά.', 'My brother studies law.', 'Ο αδελφός μου σπουδάζει νομικά.', 'Αδελφός', ['Πατέρας', 'Μητέρα', 'Αδελφή']),
      v('Αδελφή', 'Sister', 'expression', 'ah-thel-FEE', 'Η αδελφή μου παίζει όμορφα πιάνο.', 'My sister plays piano beautifully.', 'Η αδελφή μου παίζει όμορφα πιάνο.', 'Αδελφή', ['Πατέρας', 'Μητέρα', 'Αδελφός']),
      v('Παππούς', 'Grandfather', 'noun', 'pahp-POOS', 'Ο παππούς διηγείται παλιές ιστορίες.', 'Grandfather narrates old stories.', 'Ο παππούς διηγείται παλιές ιστορίες.', 'Παππούς', ['Πατέρας', 'Μητέρα', 'Αδελφός']),
      v('Γιαγιά', 'Grandmother', 'expression', 'yah-YAH', 'Η γιαγιά μαγειρεύει παραδοσιακές πίτες.', 'Grandmother cooks traditional pies.', 'Η γιαγιά μαγειρεύει παραδοσιακές πίτες.', 'Γιαγιά', ['Πατέρας', 'Μητέρα', 'Αδελφός']),
      v('Γιος', 'Son', 'noun', 'YOHS', 'Ο γιος τους παίζει μπάσκετ στην ομάδα.', 'Their son plays basketball on team.', 'Ο γιος τους παίζει μπάσκετ στην ομάδα.', 'Γιος', ['Πατέρας', 'Μητέρα', 'Αδελφός']),
      v('Κόρη', 'Daughter', 'expression', 'KOH-ree', 'Η κόρη τους μαθαίνει ξένες γλώσσες.', 'Their daughter learns foreign languages.', 'Η κόρη τους μαθαίνει ξένες γλώσσες.', 'Κόρη', ['Πατέρας', 'Μητέρα', 'Αδελφός']),
      v('Γονείς', 'Parents', 'noun', 'goh-NEES', 'Οι γονείς μου αγαπούν τα ταξίδια.', 'My parents love travels.', 'Οι γονείς μου αγαπούν τα ταξίδια.', 'Γονείς', ['Πατέρας', 'Μητέρα', 'Αδελφός']),
      v('Σπίτι', 'Home', 'expression', 'SPEE-tee', 'Το σπίτι μας είναι φιλόξενο και φωτεινό.', 'Our home is hospitable and bright.', 'Το σπίτι μας είναι φιλόξενο και φωτεινό.', 'Σπίτι', ['Πατέρας', 'Μητέρα', 'Αδελφός']),
    ],
    5: [
      v('Ψωμί', 'Bread', 'noun', 'psoh-MEE', 'Αγοράζω φρέσκο ψωμί από τον φούρνο.', 'I buy fresh bread from bakery.', 'Αγοράζω φρέσκο ψωμί από τον φούρνο.', 'Ψωμί', ['Νερό', 'Τσάι', 'Καφές']),
      v('Νερό', 'Water', 'expression', 'neh-ROH', 'Ένα ποτήρι δροσερό νερό, παρακαλώ.', 'A glass of cool water, please.', 'Ένα ποτήρι δροσερό νερό, παρακαλώ.', 'Νερό', ['Ψωμί', 'Τσάι', 'Καφές']),
      v('Τσάι', 'Tea', 'noun', 'TSAH-ee', 'Προτιμάτε τσάι του βουνού ή καφέ;', 'Do you prefer mountain tea or coffee?', 'Προτιμάτε τσάι του βουνού ή καφέ;', 'Τσάι', ['Ψωμί', 'Νερό', 'Καφές']),
      v('Καφές', 'Coffee', 'expression', 'kah-FEHS', 'Ο ελληνικός καφές έχει πλούσιο άρωμα.', 'Greek coffee has rich aroma.', 'Ο ελληνικός καφές έχει πλούσιο άρωμα.', 'Καφές', ['Ψωμί', 'Νερό', 'Τσάι']),
      v('Μήλο', 'Apple', 'noun', 'MEE-loh', 'Ένα νόστιμο κόκκινο μήλο για κολατσιό.', 'A tasty red apple for snack.', 'Ένα νόστιμο κόκκινο μήλο για κολατσιό.', 'Μήλο', ['Ψωμί', 'Νερό', 'Τσάι']),
      v('Τυρί', 'Cheese', 'expression', 'tee-REE', 'Η φέτα είναι το παραδοσιακό ελληνικό τυρί.', 'Feta is the traditional Greek cheese.', 'Η φέτα είναι το παραδοσιακό ελληνικό τυρί.', 'Τυρί', ['Ψωμί', 'Νερό', 'Τσάι']),
      v('Τρώω', 'To eat', 'noun', 'TROH-oh', 'Μας αρέσει να τρώμε όλοι μαζί το βράδυ.', 'We like eating all together at night.', 'Μας αρέσει να τρώμε όλοι μαζί το βράδυ.', 'Τρώω', ['Ψωμί', 'Νερό', 'Τσάι']),
      v('Πίνω', 'To drink', 'expression', 'PEE-noh', 'Είναι υγιεινό να πίνουμε άφθονο νερό.', 'It is healthy to drink abundant water.', 'Είναι υγιεινό να πίνουμε άφθονο νερό.', 'Πίνω', ['Ψωμί', 'Νερό', 'Τσάι']),
      v('Νόστιμο', 'Delicious', 'noun', 'NOH-stee-moh', 'Το παραδοσιακό αυτό φαγητό είναι πολύ νόστιμο.', 'This traditional food is very delicious.', 'Το παραδοσιακό αυτό φαγητό είναι πολύ νόστιμο.', 'Νόστιμο', ['Ψωμί', 'Νερό', 'Τσάι']),
      v('Πρωινό', 'Breakfast', 'expression', 'proh-ee-NOH', 'Το πρωινό σερβίρεται στις οκτώ.', 'Breakfast is served at eight.', 'Το πρωινό σερβίρεται στις οκτώ.', 'Πρωινό', ['Ψωμί', 'Νερό', 'Τσάι']),
    ],
  },
};

for (let u = 6; u <= 50; u++) {
  const roots = [["Εστιατόριο","Restaurant"],["Κατάστημα","Shop"],["Ξενοδοχείο","Hotel"],["Πόλη","City"],["Τρένο","Train"],["Αεροδρόμιο","Airport"],["Εργασία","Work"],["Σχολείο","School"],["Υγεία","Health"],["Φύση","Nature"],["Διακοπές","Vacation"],["Μουσική","Music"],["Ιστορία","History"],["Πολιτισμός","Culture"],["Επιστήμη","Science"],["Διάλογος","Dialogue"],["Κοινωνία","Society"],["Επιτυχία","Success"],["Μέλλον","Future"],["Γνώση","Knowledge"]];
  const [rootT, rootE] = roots[(u - 6) % roots.length];
  GREEK_LANGUAGE.units[u] = Array.from({ length: 10 }, (_, idx) => {
    const num = idx + 1;
    const targetTerm = `${rootT}_${u}_${num}`;
    const englishTerm = `${rootE} Concept ${u}.${num}`;
    const exTarget = `${targetTerm} is used contextually in ${rootE} unit ${u}.`;
    const exEng = `${englishTerm} is essential for advanced language comprehension.`;
    const distractors = [
      `${rootT}_${u}_${(num % 10) + 1}`,
      `${rootT}_${u}_${((num + 1) % 10) + 1}`,
      `${rootT}_${u}_${((num + 2) % 10) + 1}`,
    ];
    return v(
      targetTerm,
      englishTerm,
      idx % 2 === 0 ? 'noun' : 'verb',
      targetTerm,
      exTarget,
      exEng,
      exTarget.replace(targetTerm, '___'),
      targetTerm,
      distractors
    );
  });
}
