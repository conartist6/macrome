const { map, joinWithSeq, execPipe, str } = require('iter-tools-es');
const { Parser, All, Star, Optional, Ignore, Node } = require('@conartist6/rd-parse');

const defaultCommentLines = [
  'This file is autogenerated. Please do not edit it directly.',
  'When editing run `npx macrome watch` then change the file this is generated from.',
];

const _ = Optional(Ignore(/[ \t]+/));

const parseValue = (value) => {
  value = value.trimEnd();
  value = value || true;
  return value;
};

const key = /[a-zA-Z-]+/;
const value = /([^*\n]|\*(?!\/))*/;
const annotation = Node(
  All(_, Optional('*'), _, '@', key, _, Optional(value), _, Optional('\n')),
  ([key, value]) => [key, parseValue(value)],
);
const annotations = Node(Star(annotation), (entries) => new Map(entries));
const commentLinePrefix = / *\* ?/;
const commentLineContent = /([^*\n]|\*(?!\/))*/; // allow * but not */
const commentLine = All(Optional(Ignore(commentLinePrefix)), commentLineContent, '\n');
const commentLines = Node(All(Star(commentLine)), (commentLines) => commentLines);

const comment = Node(
  All(_, '/*', annotations, commentLines, Optional(/ */), '*/', _),
  ([annotations, commentLines]) => ({ annotations, commentLines }),
);

function renderAnnotation([key, value]) {
  return `@${key}${value === true ? '' : ` ${value}`}`;
}

class CCommentParser {
  constructor() {
    this._parser = new Parser(comment);
  }

  parse(text) {
    return this._parser.parse(text);
  }

  print({ annotations, commentLines = defaultCommentLines }) {
    const body = execPipe(
      annotations,
      map((ann) => ` * ${renderAnnotation(ann)}`),
      joinWithSeq('\n'),
      str,
    );

    const comments = commentLines.length
      ? '\n' + commentLines.map((l) => ` * ${l}`).join('\n')
      : '';

    return `/${body.slice(1)}${comments}\n */`;
  }
}

module.exports = { CCommentParser };