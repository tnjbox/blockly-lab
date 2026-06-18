export const competitionToolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: '邏輯',
      colour: '#4C7DBB',
      contents: [
        {
          kind: 'block',
          type: 'controls_if',
        },
        {
          kind: 'block',
          type: 'logic_compare',
        },
        {
          kind: 'block',
          type: 'logic_operation',
        },
        {
          kind: 'block',
          type: 'logic_negate',
        },
        {
          kind: 'block',
          type: 'logic_boolean',
        },
        {
          kind: 'block',
          type: 'logic_null',
        },
        {
          kind: 'block',
          type: 'logic_ternary',
        },
      ],
    },
    {
      kind: 'category',
      name: '迴圈',
      colour: '#5CA65C',
      contents: [
        {
          kind: 'block',
          type: 'controls_repeat_ext',
          inputs: {
            TIMES: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 10,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'controls_whileUntil',
        },
        {
          kind: 'block',
          type: 'controls_for',
          fields: {
            VAR: 'i',
          },
          inputs: {
            FROM: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
            TO: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 10,
                },
              },
            },
            BY: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'controls_forEach',
        },
        {
          kind: 'block',
          type: 'controls_flow_statements',
        },
      ],
    },
    {
      kind: 'category',
      name: '數學',
      colour: '#5C6FB1',
      contents: [
        {
          kind: 'block',
          type: 'math_number',
          fields: {
            NUM: 0,
          },
        },
        {
          kind: 'block',
          type: 'math_arithmetic',
          inputs: {
            A: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 0,
                },
              },
            },
            B: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 0,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_single',
          inputs: {
            NUM: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 9,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_trig',
          inputs: {
            NUM: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 45,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_constant',
        },
        {
          kind: 'block',
          type: 'math_number_property',
          inputs: {
            NUMBER_TO_CHECK: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 0,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_round',
          inputs: {
            NUM: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 3.1,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_on_list',
        },
        {
          kind: 'block',
          type: 'math_modulo',
          inputs: {
            DIVIDEND: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 64,
                },
              },
            },
            DIVISOR: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 10,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_constrain',
          inputs: {
            VALUE: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 50,
                },
              },
            },
            LOW: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
            HIGH: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 100,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_random_int',
          inputs: {
            FROM: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
            TO: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 100,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'math_random_float',
        },
      ],
    },
    {
      kind: 'category',
      name: '文字',
      colour: '#5CA68D',
      contents: [
        {
          kind: 'block',
          type: 'text',
        },
        {
          kind: 'block',
          type: 'text_join',
        },
        {
          kind: 'block',
          type: 'text_append',
        },
        {
          kind: 'block',
          type: 'text_length',
        },
        {
          kind: 'block',
          type: 'text_isEmpty',
        },
        {
          kind: 'block',
          type: 'text_indexOf',
        },
        {
          kind: 'block',
          type: 'text_charAt',
        },
        {
          kind: 'block',
          type: 'text_getSubstring',
        },
        {
          kind: 'block',
          type: 'text_changeCase',
        },
        {
          kind: 'block',
          type: 'text_trim',
        },
        {
          kind: 'block',
          type: 'text_print',
        },
        {
          kind: 'block',
          type: 'text_prompt_ext',
          inputs: {
            TEXT: {
              shadow: {
                type: 'text',
                fields: {
                  TEXT: '請輸入文字',
                },
              },
            },
          },
        },
      ],
    },
    {
      kind: 'category',
      name: '清單',
      colour: '#7567B8',
      contents: [
        {
          kind: 'block',
          type: 'lists_create_empty',
        },
        {
          kind: 'block',
          type: 'lists_create_with',
        },
        {
          kind: 'block',
          type: 'lists_repeat',
          inputs: {
            NUM: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 5,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'lists_length',
        },
        {
          kind: 'block',
          type: 'lists_isEmpty',
        },
        {
          kind: 'block',
          type: 'lists_indexOf',
        },
        {
          kind: 'block',
          type: 'lists_getIndex',
        },
        {
          kind: 'block',
          type: 'lists_setIndex',
        },
        {
          kind: 'block',
          type: 'lists_getSublist',
        },
        {
          kind: 'block',
          type: 'lists_sort',
        },
        {
          kind: 'block',
          type: 'lists_split',
        },
        {
          kind: 'block',
          type: 'lists_reverse',
        },
      ],
    },
    {
      kind: 'category',
      name: '變數',
      colour: '#B05A75',
      custom: 'VARIABLE',
    },
    {
      kind: 'category',
      name: '函式',
      colour: '#995BA5',
      custom: 'PROCEDURE',
    },
  ],
};