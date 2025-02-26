
const { test, describe,after,before,beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user_model')
const blogi = require('../models/blogi_model')
const bcrypt = require('bcrypt')
const api = supertest(app)
const config = require('../utils/config')






describe.only('login to get token', () => {
  test.only('login works'),async () => {
    const login = {
      'username':'root',
      'password':'salasana'
    }
    const user = await api.post('/api/login').send(login).expect(200)
    assert.strictEqual(user.body.name,'Jorma')
  }
})


describe.only('blogs api tests',() => {
  test.only('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test.only('there are a number of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, response.body.length)
  })
  test.only('has id', async () => {
    const response = await api.get('/api/blogs')
    assert('id' in response.body[response.body.length -1])
  })
})

describe.only('post working', () => {
  test.only('post works', async () => {
    const testblog = {
      'title': 'Blogi testi 5 userin kanssa',
      'author': 'Root too 5',
      'url':'testitesti.com/Root5',
      'likes':5
    }
    const initialblogs = await api.get('/api/blogs').expect(200)
    await api.post('/api/blogs').send(testblog).set({
      Authorization: config.TOKEN
    }).expect(201).expect('Content-Type', /application\/json/)
    const afterpostblogs = await api.get('/api/blogs')
    assert.strictEqual(afterpostblogs.body.length, initialblogs.body.length +1)
  })

  test.only('post works with no likes', async () => {
    const testblog = {
      'title': 'juuu',
      'author': 'juuuu',
      'url': 'juuuuu' }
    const initialblogs = await api.get('/api/blogs').expect(200)
    await api.post('/api/blogs').send(testblog).set({
      Authorization: config.TOKEN,
    }).expect(201).expect('Content-Type', /application\/json/)
    const afterpostblogs = await api.get('/api/blogs').expect(200)
    let likes = afterpostblogs.body.length -1
    assert.strictEqual(afterpostblogs.body[likes].likes,0)
  })
  test.only('post will not work without title or url', async () => {
    const testblog = {
      'author': 'juuuu',
      'url':'juu'
    }
    await api.post('/api/blogs').send(testblog).set({
      Authorization: config.TOKEN,
    }).expect(400)
  })
})

describe.only('delete works', () => {
  test.only('delete works', async () => {
    const initialblogs = await api.get('/api/blogs').expect(200)
    const lenOfdb = initialblogs.body.length -1
    const idofLast = initialblogs.body[lenOfdb].id
    const idofseconlast = initialblogs.body[(lenOfdb -1)].id
    await api.delete('/api/blogs/'+idofLast).set({ Authorization: config.TOKEN }).expect(204)
    await api.delete('/api/blogs/'+idofseconlast).set({ Authorization: config.TOKEN }).expect(204)
    const afterdel = await api.get('/api/blogs').expect(200)
    assert.strictEqual(initialblogs.body.length -2 , afterdel.body.length )
  })

})

describe.only('put works', () => {
  test.only('put works', async () => {
    const initialblogs = await api.get('/api/blogs').expect(200)
    const lenOfdb = initialblogs.body.length -1
    const Lastblog = initialblogs.body[lenOfdb]

    let updatedLikes = Lastblog.likes +2
    const testblog = {
      'title': Lastblog.title,
      'author': Lastblog.author,
      'url':Lastblog.url,
      'likes':updatedLikes }
    const updated = await api.put('/api/blogs/'+Lastblog.id).send(testblog).expect(201).expect('Content-Type', /application\/json/)
  })
})

describe.only('delete all users and blogs in db and create new user', () => {
  test.only(async () => {
    await User.deleteMany({})
    await blogi.deleteMany({})
    const passwordHash = await bcrypt.hash('salasana', 10)
    const user = new User({ username: 'root',name:'Jorma', passwordHash })
    await user.save()
  })

})
after(async () => {
  await mongoose.connection.close()
})