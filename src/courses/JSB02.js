export const JSB02 = {
  "code": "JSB02",
  "title": "基礎練習2",
  "type": "programming",
  "mode": "contest",
  "tasks": [
    {
      "id": "A-08-0",
      "title": "查找最大值",
      "description": "老師進行成績統計，老師輸入每位同學的成績，請你寫一個程式找出最高分。\n\n輸入第一行是整數 N，代表有 N 筆成績\n\n第二行輸入 N 個數字，數字間以空白間隔\n\n程式輸出最大值。\n這樣的練習可以幫助你處理一串資料，並找出其中的最大值。",
      "examples": [
        {
          "input": "3\n9 6 8",
          "output": "9",
          "explanation": "第一行輸入3，表示有3個數字要輸入\n\n第二行輸入9 6 8三個數字序列\n\n程式運算輸出最大值9"
        },
        {
          "input": "6\n99 12 129 16 8",
          "output": "129",
          "explanation": "第一行輸入6，表示有6個數字要輸入\n\n第二行輸入99 12 129 16 8 3六個數字序列\n\n程式運算輸出最大值129"
        }
      ],
      "testCases": [
        {
          "input": "3\n9 6 8\n第四個輸入：\n預期答案：9",
          "expectedOutput": "9",
          "score": 10
        },
        {
          "input": "6\n99 12 129 16 8 3\n第四個輸入：\n預期答案：129",
          "expectedOutput": "129",
          "score": 10
        },
        {
          "input": "5\n89 15 47 0 56\n第四個輸入：\n預期答案：89",
          "expectedOutput": "89",
          "score": 10
        },
        {
          "input": "1\n25\n第四個輸入：\n預期答案：25",
          "expectedOutput": "25",
          "score": 10
        }
      ],
      "starterXml": ""
    },
    {
      "id": "A-08-1",
      "title": "查找最大值、最小值",
      "description": "老師進行成績統計，老師輸入每位同學的成績，請你寫一個程式找出最高分及最低分。\n\n輸入第一行是整數 N，代表有 N 筆成績\n\n第二行輸入 N 個數字，數字間以空白間隔\n\n程式輸出最大值及最小值。\n這樣的練習可以幫助你處理一串資料，並同時找出其中的最大值、最小值。",
      "examples": [
        {
          "input": "3\n9 6 8",
          "output": "9\n6",
          "explanation": "第一行輸入3，表示有3個數字要輸入\n\n第二行輸入9 6 8三個數字序列\n\n程式運算輸出最大值9，最小值6"
        },
        {
          "input": "6\n99 12 129 16 8 3",
          "output": "129\n3",
          "explanation": "第一行輸入6，表示有6個數字要輸入\n\n第二行輸入99 12 129 16 8 3六個數字序列\n\n程式運算輸出最大值129，最小值3"
        }
      ],
      "testCases": [
        {
          "input": "3\n9 6 8\n第四個輸入：\n預期答案：9 6",
          "expectedOutput": "9 6",
          "score": 10
        },
        {
          "input": "6\n99 12 129 16 8 3\n第四個輸入：\n預期答案：129 3",
          "expectedOutput": "129 3",
          "score": 10
        },
        {
          "input": "5\n89 15 47 0 56\n第四個輸入：\n預期答案：89 0",
          "expectedOutput": "89 0",
          "score": 10
        },
        {
          "input": "1\n25\n第四個輸入：\n預期答案：25 25",
          "expectedOutput": "25 25",
          "score": 10
        }
      ],
      "starterXml": ""
    },
    {
      "id": "A-09-0",
      "title": "判斷質數",
      "description": "質數是大於 1 且只能被 1 和自己整除的數字。\n請寫一個程式，輸入一個整數 N，判斷它是否為質數。\n\n若是質數輸出 Yes，否則輸出 No。\n\n這題訓練你使用條件與迴圈判斷。",
      "examples": [
        {
          "input": "1",
          "output": "No",
          "explanation": "第一行輸入1\n\n電腦運算判斷1不是質數\n\n程式運算輸出No"
        },
        {
          "input": "2",
          "output": "Yes",
          "explanation": "第一行輸入2\n\n電腦運算判斷2是質數\n\n程式運算輸出Yes"
        },
        {
          "input": "7",
          "output": "Yes",
          "explanation": "第一行輸入7\n\n電腦運算判斷7是質數\n\n程式運算輸出Yes"
        },
        {
          "input": "6",
          "output": "No",
          "explanation": "第一行輸入6\n\n電腦運算判斷6可被2整除，不是質數\n\n程式運算輸出No"
        }
      ],
      "testCases": [
        {
          "input": "1\n第三個輸入：\n第四個輸入：\n預期答案：No",
          "expectedOutput": "No",
          "score": 10
        },
        {
          "input": "2\n第三個輸入：\n第四個輸入：\n預期答案：Yes",
          "expectedOutput": "Yes",
          "score": 10
        },
        {
          "input": "1007\n第三個輸入：\n第四個輸入：\n預期答案：No",
          "expectedOutput": "No",
          "score": 10
        },
        {
          "input": "997\n第三個輸入：\n第四個輸入：\n預期答案：Yes",
          "expectedOutput": "Yes",
          "score": 10
        }
      ],
      "starterXml": ""
    },
    {
      "id": "A-09-1",
      "title": "找因數",
      "description": "因數是指一個整數能被另一整數「整除」時，這個「除數」就是「被除數」的因數。\n\n0不是任何整數的因數。1是所有整數的因數。\n\n請寫一個程式，輸入一個整數 N，請找出N所有的因數。\n\n所有因數以空白符號間格\n\n這題訓練你使用條件與迴圈判斷。",
      "examples": [
        {
          "input": "12",
          "output": "1 2 3 4 6 12",
          "explanation": "第一行輸入12\n\n程式輸出12所有因數1 2 3 4 6 12"
        },
        {
          "input": "39",
          "output": "1 3 13 39",
          "explanation": "第一行輸入39\n\n程式輸出39所有因數1 3 13 39"
        }
      ],
      "testCases": [
        {
          "input": "56\n第三個輸入：\n第四個輸入：\n預期答案：1 2 4 7 8 14 28 56",
          "expectedOutput": "1 2 4 7 8 14 28 56",
          "score": 10
        },
        {
          "input": "37\n第三個輸入：\n第四個輸入：\n預期答案：1 37",
          "expectedOutput": "1 37",
          "score": 10
        },
        {
          "input": "78\n第三個輸入：\n第四個輸入：\n預期答案：1 2 3 6 13 26 39 78",
          "expectedOutput": "1 2 3 6 13 26 39 78",
          "score": 10
        },
        {
          "input": "88\n第三個輸入：\n第四個輸入：\n預期答案：1 2 4 8 11 22 44 88",
          "expectedOutput": "1 2 4 8 11 22 44 88",
          "score": 10
        }
      ],
      "starterXml": ""
    },
    {
      "id": "A-10-0",
      "title": "多科成績計算",
      "description": "小明參加了數學、英文、自然...等多科的段考，老師希望能快速算出總分與平均分數，並判斷是否及格。\n\n請設計程式，輸入多科的成績，計算總分與平均。\n\n第一行輸入共有幾科\n\n第二行依序輸入各科成績，科成績之間以空白間隔\n\n計算總分，平均成績以四捨五入取整數\n\n如果平均分數大於等於 60，就輸出「及格」，否則輸出「不及格」。\n\n這題可以訓練你如何處理多筆資料的加總、平均計算，並搭配條件判斷。",
      "examples": [
        {
          "input": "3\n80 70 90",
          "output": "240\n80\n及格",
          "explanation": "第一行輸入3，表示後面會有3個數字輸入\n\n第二行輸入80 70 90，經過計算後\n\n總分180、平均80、及格"
        },
        {
          "input": "6\n50 41 60 55 70 65",
          "output": "341\n57\n不及格",
          "explanation": "第一行輸入6，表示後面會有3個數字輸入\n\n第二行輸入50 41 60 55 70 65，經過計算後\n\n程式輸出總分341、平均57、不及格"
        }
      ],
      "testCases": [
        {
          "input": "3\n20 60 90\n第四個輸入：\n預期答案：170 57 不及格",
          "expectedOutput": "170 57 不及格",
          "score": 10
        },
        {
          "input": "6\n50 41 60 55 70 65\n第四個輸入：\n預期答案：341 57 不及格",
          "expectedOutput": "341 57 不及格",
          "score": 10
        },
        {
          "input": "5\n80 70 75 85 90\n第四個輸入：\n預期答案：400 80 及格",
          "expectedOutput": "400 80 及格",
          "score": 10
        },
        {
          "input": "1\n55\n第四個輸入：\n預期答案：55 55 不及格",
          "expectedOutput": "55 55 不及格",
          "score": 10
        }
      ],
      "starterXml": ""
    },
    {
      "id": "A-10-1",
      "title": "加權成績計算",
      "description": "大明綜合高中辦理考試，不同科系考試科目數量、每周上課時數不一定相同\n\n成績計算時，以每一科成績乘以該科上課時數為加權成績，將所有科目的加權成績加總，並除以全部科目總時數，即為學生加權平均成績\n\n請設計一個程式，輸入各科的成績、各科加權時數，程式運算後輸出加權總分、加權平均、等弟。\n\n第一行輸入N，代表該科共有N科考試成績\n\n第二行依序輸入N筆各科成績，各科成績之間以空白間隔\n\n第三行依序輸入N筆各科對應加權時數，各科加權時數之間以空白間隔\n\n計算全部加權總分，加權平均成績以四捨五入取整數\n\n如果平均分數大於等於 80，就是「A」等第，小於80大於等於70則是「B」等第，小於70大於等於60則是「C」等第，否則是「D」等第。\n\n程式輸出加權總分、加權平均、等弟。\n\n這題可以訓練你如何處理多筆資料的加總、平均計算，並搭配條件判斷。",
      "examples": [
        {
          "input": "3\n80 70 90\n1 2 1",
          "output": "310\n78\nB",
          "explanation": "第一行輸入3，表示後面會有3科成績輸入\n\n第二行輸入各科原始成績80 70 90\n\n第三行輸入各科加權時數1 2 1\n\n程式運算輸出加權總分310、平均78、等第B"
        },
        {
          "input": "6\n50 41 60 55 70 65",
          "output": "668\n56\nD",
          "explanation": "第一行輸入6，表示後面會有6科成績輸入\n\n第二行輸入各科原始成績50 41 60 55 70 65\n\n第三行輸入各科加權時數1 3 3 2 2 1\n\n程式運算輸出加權總分668、平均56、等第D"
        }
      ],
      "testCases": [
        {
          "input": "1\n80\n3\n預期答案：240 80 A",
          "expectedOutput": "240 80 A",
          "score": 10
        },
        {
          "input": "6\n50 41 60 55 70 65\n1 3 3 2 2 1\n預期答案：668 56 D",
          "expectedOutput": "668 56 D",
          "score": 10
        },
        {
          "input": "5\n80 70 75 85 90\n1 1 3 2 1\n預期答案：635 79 B",
          "expectedOutput": "635 79 B",
          "score": 10
        },
        {
          "input": "3\n55 90 99\n2 3 3\n預期答案：677 85 A",
          "expectedOutput": "677 85 A",
          "score": 10
        }
      ],
      "starterXml": ""
    },
    {
      "id": "A-11-0",
      "title": "計算字元出現次數",
      "description": "請設計程式，輸入一個字串，並輸入一個英文字母輸出該字母在字串中出現的次數。\n\n這樣的練習可以訓練你操作字串與統計。",
      "examples": [
        {
          "input": "banana\na",
          "output": "3",
          "explanation": "第一行輸入banana\n\n第二行輸入字元a\n\n程式運算比對a出現3次\n\n程式輸出3"
        },
        {
          "input": "student\nt",
          "output": "2",
          "explanation": "第一行輸入student\n\n第二行輸入字元t\n\n程式運算比對t出現2次\n\n程式輸出2"
        }
      ],
      "testCases": [
        {
          "input": "Goodmoning\no\n第四個輸入：\n預期答案：3",
          "expectedOutput": "3",
          "score": 10
        },
        {
          "input": "ChaiYiCity\ni\n第四個輸入：\n預期答案：3",
          "expectedOutput": "3",
          "score": 10
        },
        {
          "input": "announcement\nn\n第四個輸入：\n預期答案：4",
          "expectedOutput": "4",
          "score": 10
        },
        {
          "input": "experimen\ne\n第四個輸入：\n預期答案：3",
          "expectedOutput": "3",
          "score": 10
        }
      ],
      "starterXml": ""
    },
    {
      "id": "A-11-1",
      "title": "計算字元出現最多的次數",
      "description": "請設計程式，輸入一字串由小寫英文字母組合，長度1~50間的字串\n\n程式會統計該字串的字母中，出現最多的次數。\n\n這樣的練習可以訓練你循環計數迴圈與字串統計。",
      "examples": [
        {
          "input": "banana",
          "output": "3",
          "explanation": "第一行輸入banana\n\n程式運算比對，出現最多為a，共出現3次\n\n程式輸出3"
        },
        {
          "input": "student",
          "output": "2",
          "explanation": "第一行輸入student\n\n程式運算比對，出現最多為t，共出現2次\n\n程式輸出2"
        },
        {
          "input": "spider",
          "output": "1",
          "explanation": "第一行輸入spider\n\n程式運算比對，全部字母都只出現1次\n\n程式輸出1"
        }
      ],
      "testCases": [
        {
          "input": "goodmoning\n第三個輸入：\n第四個輸入：\n預期答案：3",
          "expectedOutput": "3",
          "score": 10
        },
        {
          "input": "ChaiYiCity\n第三個輸入：\n第四個輸入：\n預期答案：3",
          "expectedOutput": "3",
          "score": 10
        },
        {
          "input": "announment\n第三個輸入：\n第四個輸入：\n預期答案：4",
          "expectedOutput": "4",
          "score": 10
        },
        {
          "input": "experimen\n第三個輸入：\n第四個輸入：\n預期答案：3",
          "expectedOutput": "3",
          "score": 10
        },
        {
          "input": "junior\n第三個輸入：\n第四個輸入：\n預期答案：1",
          "expectedOutput": "1",
          "score": 10
        }
      ],
      "starterXml": ""
    },
    {
      "id": "A-12-0",
      "title": "簡易密碼轉換",
      "description": "小明設計了一種簡單的密碼環密碼規則：將每個字母向後移二個字母（z 變 b）。\n\n密碼環：abcdefghijklmnopqrstuvwxyz\n\n請寫一個程式，輸入一個英文單字，輸出轉換後的字串。\n\n這樣的練習訓練你字元處理與條件轉換。",
      "examples": [
        {
          "input": "banana",
          "output": "dcpcpc",
          "explanation": "第一行輸入banana\n\n程式運算，將字串往後移2個位置加密\n\n程式輸出dcpcpc"
        },
        {
          "input": "student",
          "output": "uvwfgpv",
          "explanation": "第一行輸入student\n\n程式運算，將字串往後移2個位置加密\n\n程式輸出uvwfgpv"
        }
      ],
      "testCases": [
        {
          "input": "goodmoning\n第三個輸入：\n第四個輸入：\n預期答案：iqqfoqpkpi",
          "expectedOutput": "iqqfoqpkpi",
          "score": 10
        },
        {
          "input": "chaiyicity\n第三個輸入：\n第四個輸入：\n預期答案：ejckakekva",
          "expectedOutput": "ejckakekva",
          "score": 10
        },
        {
          "input": "announcement\n第三個輸入：\n第四個輸入：\n預期答案：cppqwpegogpv",
          "expectedOutput": "cppqwpegogpv",
          "score": 10
        },
        {
          "input": "experimen\n第三個輸入：\n第四個輸入：\n預期答案：gzrgtkogp",
          "expectedOutput": "gzrgtkogp",
          "score": 10
        }
      ],
      "starterXml": ""
    },
    {
      "id": "A-12-1",
      "title": "動態密碼轉換",
      "description": "小明設計了一種英文字元密碼環編碼規則：\n\n密碼環為『abcdefghijklmnopqrstuvwxyz0123456789』\n\n第一行輸入數字N(N介於0~36)，N為編碼位移值\n\n編碼時，待編碼字串每個字元都按照密碼環『往前』移動N個位置\n\n如果轉換後密碼超過密碼環最後一個字元9，則從回前面a繼續接回密碼環\n\n請寫一個程式，輸入一個英文單字，程式輸出依照編碼規則轉換後的密碼字串。\n\n這樣的練習訓練你字元處理與條件轉換。",
      "examples": [
        {
          "input": "2\nbanana",
          "output": "98l8l8",
          "explanation": "第一行輸入2，表示編碼時要往後前2個位置\n\n第二行輸入banana表示待編碼字串為banana\n\n程式運算，將字串往後移2個位置加密\n\n程式輸出98l8l8"
        },
        {
          "input": "10\nstudent",
          "output": "ijk34dj",
          "explanation": "第一行輸入10，表示編碼時要往後前10個位置\n\n第二行輸入student表示待編碼字串為student\n\n程式運算，將字串往後移10個位置加密\n\n程式輸出ijk34dj"
        }
      ],
      "testCases": [
        {
          "input": "12\ngoodmoning\n第四個輸入：\n預期答案：4cc1acb6b4",
          "expectedOutput": "4cc1acb6b4",
          "score": 10
        },
        {
          "input": "29\nchaiyicity\n第四個輸入：\n預期答案：johp5pjp05",
          "expectedOutput": "johp5pjp05",
          "score": 10
        },
        {
          "input": "9\nannouncement\n第四個輸入：\n預期答案：1eefle35d5ek",
          "expectedOutput": "1eefle35d5ek",
          "score": 10
        },
        {
          "input": "0\nexperimen\n第四個輸入：\n預期答案：experimen",
          "expectedOutput": "experimen",
          "score": 10
        }
      ],
      "starterXml": ""
    },
    {
      "id": "A-13-0",
      "title": "二數的最大公因數",
      "description": "小明上學時，不太會找最大公因數，請寫個程式幫他找一下\n輸入二個整數，請計算這二個數字的最大公因數\n\n輸入格式：輸入2行\n第一行輸入第1個整數N\n第二行輸入地2個整數M\n程式運算找出二數的最大公因數並輸出",
      "examples": [
        {
          "input": "9\n6",
          "output": "3",
          "explanation": "第一行輸入9，\n\n第二行輸入6，\n\n程式輸出6、9二個數的最大公因數3"
        },
        {
          "input": "30\n72",
          "output": "6",
          "explanation": "第一行輸入30，\n\n第二行輸入72\n\n程式輸出30，72二個數的最大公因數6"
        }
      ],
      "testCases": [
        {
          "input": "12\n6\n第四個輸入：\n預期答案：6",
          "expectedOutput": "6",
          "score": 10
        },
        {
          "input": "34\n52\n第四個輸入：\n預期答案：2",
          "expectedOutput": "2",
          "score": 10
        },
        {
          "input": "24\n18\n第四個輸入：\n預期答案：6",
          "expectedOutput": "6",
          "score": 10
        },
        {
          "input": "1\n8\n第四個輸入：\n預期答案：1",
          "expectedOutput": "1",
          "score": 10
        }
      ],
      "starterXml": ""
    },
    {
      "id": "A-13-1",
      "title": "最大公因數",
      "description": "小明上學時，不太會找最大公因數，請寫個程式幫他找一下\n輸入一組整數，請計算這些數字的最大公因數\n\n輸入格式：輸入2行\n第一行輸入1個整數N，代表接下來要計算最大公因數的個數\n第二行輸入N個整數，用空格隔開，代表要計算最大公因數的N個整數",
      "examples": [
        {
          "input": "2\n6 9",
          "output": "3",
          "explanation": "第一行輸入2，表示接下來要輸入2個數\n\n第二行輸入6 9，表示要找出6、9的最大公因數\n\n程式輸出最大公因數3"
        },
        {
          "input": "3\n4 6 12",
          "output": "2",
          "explanation": "第一行輸入3，表示接下來要輸入3個數\n\n第二行輸入4 6 12，表示要找出4、6、12的最大公因數\n\n程式輸出最大公因數2"
        },
        {
          "input": "2\n1 99",
          "output": "1",
          "explanation": "第一行輸入2，表示接下來要輸入2個數\n\n第二行輸入1 99，表示要找出1，99的最大公因數\n\n程式輸出最大公因數1"
        },
        {
          "input": "1\n8",
          "output": "8",
          "explanation": "第一行輸入1，表示接下來要輸入1個數\n\n第二行輸入8，表示要找出8的最大公因數\n\n自己的最大公因數是自己，程式輸出最大公因數8"
        }
      ],
      "testCases": [
        {
          "input": "3\n12 24 30\n第四個輸入：\n預期答案：6",
          "expectedOutput": "6",
          "score": 10
        },
        {
          "input": "6\n2 5 24 15 36 54\n第四個輸入：\n預期答案：1",
          "expectedOutput": "1",
          "score": 10
        },
        {
          "input": "3\n51 9 24\n第四個輸入：\n預期答案：3",
          "expectedOutput": "3",
          "score": 10
        },
        {
          "input": "1\n8\n第四個輸入：\n預期答案：8",
          "expectedOutput": "8",
          "score": 10
        }
      ],
      "starterXml": ""
    }
  ]
};
