import { api, addPhrase, expectErrors, testAuth } from "../helpers";
import { Phrases } from "../../src/entities/Phrase";

test("add", async () => {
  await testAuth({
    method: "post",
    path: "/phrases",
    data: { text: "hi" },
    secondExpectedCode: 409
  })

  await api.post("/phrases").authenticate()
    .send({ text: "hello" })
    .expect(200, {
      text: "hello",
      id: 2
    })

  await api.post("/phrases").authenticate()
    .send({ text: "hell o" })
    .expect(200, {
      text: "hell o",
      id: 3
    })

  await api.post("/phrases").authenticate()
    .send({ text: "   hej    då   " })
    .expect(200, {
      text: "hej då",
      id: 4
    })
    let phrase = await Phrases.getOneById(1)
    phrase = Object.setPrototypeOf(phrase, Object.prototype);
    let meaning = await Phrases.getOneById(2)
    meaning = Object.setPrototypeOf(meaning, Object.prototype);
  await api.post("/synonyms").authenticate()
    
    .send({
      phrase: 1,
      meaning: 2
    })
    
    .expect(200, {
      id: 1,
      phrase:  phrase,
      meaning: meaning,
      group: null
    })
});

test("get", async () => {
  let resp = await api.get("/phrases")
    .expect(200, [
      {
        text: "hi",
        id: 1,
        synonyms: [{
          id: 1,
          meaning: {
            text: "hello",
            id: 2
          }
        }]
      },
      {
        text: "hello",
        id: 2,
        synonyms: []
      },
      {
        text: "hell o",
        id: 3,
        synonyms: []
      },
      {
        text: "hej då",
        id: 4,
        synonyms: []
      },
    ])
});

test("get specific", async () => {
  let resp = await api.get("/phrases/2")
    .expect(200, {
      text: "hello",
      id: 2
    })
});

test("add duplicate", async () => {
  let resp = await api.post("/phrases").authenticate()
    .send({ text: "hello" })
    .expect(409)
});

test("add bad phrases", async () => {
  await api.post("/phrases").authenticate().send({ text: "@£$!?=)(/&[]{}%" }).expect(400)
  await api.post("/phrases").authenticate().send({ text: "longtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtextlongtext" }).expect(400)
  await api.post("/phrases").authenticate().send({ text: "" }).expect(400)
});

test("update", async () => {
  await testAuth({ method: "put", path: "/phrases/1", data: { text: "bye bye" } })
  await api.put("/phrases/1").authenticate().send({ text: "bye" }).expect(200)
})

test("delete one existing", async () => {
  await testAuth({ method: "delete", path: "/phrases", data: { ids: [1] } })
  await api.delete("/phrases").authenticate().send({ ids: [2] }).expect(200,{
    deleted: [
      2
    ]
  })
});

test("delete multiple", async () => {
  // add three phrases
  let phrase1 = await addPhrase("hey")
  let phrase2 = await addPhrase("bye")
  let phrase3 = await addPhrase("goodbye")

  // delete all
  await api.delete("/phrases").authenticate()
    .send({ ids: [phrase1.id, phrase2.id, phrase3.id] })
    .expect(200,{
      deleted: [
        phrase1.id,
        phrase2.id,
        phrase3.id
      ]
    })
})

test("delete none existing", async () => {
  await api.delete("/phrases").authenticate()
    .send({ ids: [1] })
    .expect(200,{
      deleted: [
      ]
    })
});

test("delete with bad input", async () => {
  await expectErrors(api.delete("/phrases").authenticate().send({ ids: "" }), 400)
  await expectErrors(api.delete("/phrases").authenticate().send({ ids: {} }), 400)
  await expectErrors(api.delete("/phrases").authenticate().send({ ids: "abc" }), 400)
  await expectErrors(api.delete("/phrases").authenticate().send({ ids: 123 }), 400)
});
