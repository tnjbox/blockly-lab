export const competitionToolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: '邏輯',
      categorystyle: 'logic_category',
      contents: [
        { kind: 'block', type: 'controls_if' },
        { kind: 'block', type: 'logic_compare' },
        { kind: 'block', type: 'logic_operation' },
        { kind: 'block', type: 'logic_negate' },
        { kind: 'block', type: 'logic_boolean' },
        { kind: 'block', type: 'logic_null' },
        { kind: 'block', type: 'logic_ternary' },
      ],
    },
    {
      kind: 'category',
      name: '迴圈',
      categorystyle: 'loop_category',
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
        { kind: 'block', type: 'controls_whileUntil' },
        {
          kind: 'block',
          type: 'controls_for',
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
        { kind: 'block', type: 'controls_forEach' },
        { kind: 'block', type: 'controls_flow_statements' },
      ],
    },
    {
      kind: 'category',
      name: '數學',
      categorystyle: 'math_category',
      contents: [
        { kind: 'block', type: 'math_number' },
        { kind: 'block', type: 'math_arithmetic' },
        { kind: 'block', type: 'math_single' },
        { kind: 'block', type: 'math_trig' },
        { kind: 'block', type: 'math_constant' },
        { kind: 'block', type: 'math_number_property' },
        { kind: 'block', type: 'math_round' },
        { kind: 'block', type: 'math_on_list' },
        { kind: 'block', type: 'math_modulo' },
        { kind: 'block', type: 'math_constrain' },
        { kind: 'block', type: 'math_random_int' },
        { kind: 'block', type: 'math_random_float' },
      ],
    },
    {
      kind: 'category',
      name: '文字',
      categorystyle: 'text_category',
      contents: [
        { kind: 'block', type: 'text' },
        { kind: 'block', type: 'text_join' },
        { kind: 'block', type: 'text_append' },
        { kind: 'block', type: 'text_length' },
        { kind: 'block', type: 'text_isEmpty' },
        { kind: 'block', type: 'text_indexOf' },
        { kind: 'block', type: 'text_charAt' },
        { kind: 'block', type: 'text_getSubstring' },
        { kind: 'block', type: 'text_changeCase' },
        { kind: 'block', type: 'text_trim' },
        { kind: 'block', type: 'text_count' },
        { kind: 'block', type: 'text_replace' },
        { kind: 'block', type: 'text_reverse' },
        { kind: 'block', type: 'text_print' },
        { kind: 'block', type: 'text_prompt_ext' },
      ],
    },
    {
      kind: 'category',
      name: '清單',
      categorystyle: 'list_category',
      contents: [
        { kind: 'block', type: 'lists_create_empty' },
        { kind: 'block', type: 'lists_create_with' },
        { kind: 'block', type: 'lists_repeat' },
        { kind: 'block', type: 'lists_length' },
        { kind: 'block', type: 'lists_isEmpty' },
        { kind: 'block', type: 'lists_indexOf' },
        { kind: 'block', type: 'lists_getIndex' },
        { kind: 'block', type: 'lists_setIndex' },
        { kind: 'block', type: 'lists_getSublist' },
        { kind: 'block', type: 'lists_split' },
        { kind: 'block', type: 'lists_sort' },
        { kind: 'block', type: 'lists_reverse' },
      ],
    },
    {
      kind: 'sep',
    },
    {
      kind: 'category',
      name: '變數',
      categorystyle: 'variable_category',
      custom: 'VARIABLE',
    },
    {
      kind: 'category',
      name: '函式',
      categorystyle: 'procedure_category',
      custom: 'PROCEDURE',
    },
    {
      kind: 'sep',
    },
    {
      kind: 'category',
      name: 'SmartRing',
      colour: '#0f766e',
      contents: [
        { kind: 'block', type: 'smartring_is_connected' },
        { kind: 'block', type: 'smartring_button_pressed' },
        {
          kind: 'block',
          type: 'smartring_set_led_color',
          inputs: {
            INDEX: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
          },
        },
        { kind: 'block', type: 'smartring_clear_leds' },
        {
          kind: 'block',
          type: 'smartring_wait_ms',
          inputs: {
            MS: {
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
          kind: 'sep',
        },
        {
          kind: 'label',
          text: 'LED 暫存陣列',
        },
        {
          kind: 'block',
          type: 'smartring_set_buffer_led_color',
          inputs: {
            INDEX: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
          },
        },
        { kind: 'block', type: 'smartring_clear_led_buffer' },
        { kind: 'block', type: 'smartring_show_led_buffer' },
        {
          kind: 'block',
          type: 'smartring_shift_led_buffer_left',
          inputs: {
            STEPS: {
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
          type: 'smartring_shift_led_buffer_right',
          inputs: {
            STEPS: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 1,
                },
              },
            },
          },
        },
        { kind: 'block', type: 'smartring_set_odd_buffer_leds' },
        { kind: 'block', type: 'smartring_set_even_buffer_leds' },
        {
          kind: 'sep',
        },
        {
          kind: 'label',
          text: 'LED 圖樣與狀態顯示',
        },
        { kind: 'block', type: 'smartring_set_buffer_pattern' },
        {
          kind: 'block',
          type: 'smartring_set_buffer_progress',
          inputs: {
            COUNT: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 6,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'smartring_set_buffer_score',
          inputs: {
            SCORE: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 50,
                },
              },
            },
            MAX_SCORE: {
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
          type: 'smartring_set_buffer_life',
          inputs: {
            LIFE: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 3,
                },
              },
            },
            MAX_LIFE: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 5,
                },
              },
            },
          },
        },
      ],
    },
  ],
};
