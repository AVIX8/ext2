<template>
  <v-row class="ma-0">
    <v-col>
      <v-card v-if="$store.state.ext2.active">
        <v-card-title
          >{{ $store.state.ext2.active.name }}
          <v-spacer />
          <v-btn v-if="!$store.state.ext2.active.isDir" icon @click="download"><v-icon>mdi-file-export</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-simple-table dense>
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">Название</th>
                  <th class="text-left">Значение</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in active" :key="item.name">
                  <v-tooltip bottom :disabled="!item.description">
                    <template #activator="{ on, attrs }">
                      <td v-bind="attrs" v-on="on">{{ item.name }}</td>
                      <td>{{ item.value }}</td>
                    </template>
                    <span>{{ item.description }}</span>
                  </v-tooltip>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col>
      <v-card v-if="$store.state.ext2.superblock">
        <v-card-title>Superblock</v-card-title>
        <v-card-text>
          <v-simple-table dense>
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">Название</th>
                  <th class="text-left">Значение</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in superblock" :key="item.name">
                  <v-tooltip bottom :disabled="!item.description">
                    <template #activator="{ on, attrs }">
                      <td v-bind="attrs" v-on="on">{{ item.name }}</td>
                      <td>{{ item.value }}</td>
                    </template>
                    <span>{{ item.description }}</span>
                  </v-tooltip>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    superblock() {
      const s = this.$store.state.ext2.superblock
      return [
        {
          name: 's_inodes_count',
          value: s.s_inodes_count,
          description:
            '32-битное значение, указывающее общее количество inode, как используемых, так и свободных, в файловой системе.',
        },
        {
          name: 's_blocks_count',
          value: s.s_blocks_count,
          description:
            '32-битное значение, указывающее общее количество блоков в системе, включая все используемые, свободные и зарезервированные.',
        },
        {
          name: 's_r_blocks_count',
          value: s.s_r_blocks_count,
          description:
            '32-битное значение, указывающее общее количество блоков, зарезервированных для использования суперпользователя.',
        },
        {
          name: 's_free_blocks_count',
          value: s.s_free_blocks_count,
          description:
            '32-битное значение, указывающее общее количество свободных блоков, включая количество зарезервированных блоков',
        },
        {
          name: 's_free_inodes_count',
          value: s.s_free_inodes_count,
          description:
            '32-битное значение, указывающее общее количество свободных inodes. Это сумма всех свободных inodes всех групп блоков.',
        },
        {
          name: 's_first_data_block',
          value: s.s_first_data_block,
          description:
            '32-битное значение, идентифицирующее первый блок данных, т.е. идентификатор блока, содержащего структуру superblock.',
        },
        {
          name: 's_log_block_size',
          value: s.s_log_block_size,
          description:
            'Размер блока вычисляется с использованием этого 32-битного значения в качестве количества битов для сдвига влево значения 1024.',
        },
        {
          name: 's_log_frag_size',
          value: s.s_log_frag_size,
          description:
            'Размер фрагмента вычисляется с использованием этого 32-битного значения в качестве количества битов для сдвига влево значения 1024.',
        },
        {
          name: 's_blocks_per_group',
          value: s.s_blocks_per_group,
          description:
            '32-битное значение, указывающее общее количество блоков на группу.',
        },
        {
          name: 's_frags_per_group',
          value: s.s_frags_per_group,
          description:
            '32-битное значение, указывающее общее количество фрагментов на группу.',
        },
        {
          name: 's_inodes_per_group',
          value: s.s_inodes_per_group,
          description:
            '32-битное значение, указывающее общее количество inodes на группу.',
        },
        {
          name: 's_mtime',
          value: new Date(s.s_mtime).toLocaleString('ru-RU'),
          description:
            'Unix-время, когда в последний раз, когда файловая система была смонтированна.',
        },
        {
          name: 's_wtime',
          value: new Date(s.s_wtime).toLocaleString('ru-RU'),
          description:
            'Unix-время последнего доступа к записи к файловой системе.',
        },
        {
          name: 's_mnt_count',
          value: s.s_mnt_count,
          description:
            '16-битное значение, указывающее, сколько раз файловая система была смонтированна с момента полной проверки.',
        },
        {
          name: 's_max_mnt_count',
          value: s.s_max_mnt_count,
          description:
            '16-битное значение, указывающее максимальное количество раз, сколько файловая система может быть смонтированна до выполнения полной проверки.',
        },
        {
          name: 's_magic',
          value: s.s_magic,
          description:
            '16-битное значение идентифицирует файловую систему как ext2. Значение в настоящее время прикреплено к ext2_super_magic значения 0xef53.',
        },
        {
          name: 's_state',
          value: s.s_state,
          description:
            '16-битное значение, указывающее состояние файловой системы.',
        },
        {
          name: 's_errors',
          value: s.s_errors,
          description:
            '16-битное значение, указывающее, что должен делать драйвер файловой системы, когда обнаружена ошибка.',
        },
        {
          name: 's_minor_rev_level',
          value: s.s_minor_rev_level,
          description:
            '16-битное значение, идентифицирующее второстепенный уровень версии в пределах своего уровня версии.',
        },
        {
          name: 's_lastcheck',
          value: new Date(s.s_lastcheck).toLocaleString('ru-RU'),
          description: 'Unix-время последней проверки файловой системы.',
        },
        {
          name: 's_checkinterval',
          value: s.s_checkinterval,
          description:
            'Максимальный интервал времени Unix допустимый между проверкой файловой системы.',
        },
        {
          name: 's_creator_os',
          value: s.s_creator_os,
          description: '32-битный идентификатор ОС, создавшей файловую систему',
        },
        {
          name: 's_rev_level',
          value: s.s_rev_level,
          description: '32-битное значение уровня версии.',
        },
        {
          name: 's_def_resuid',
          value: s.s_def_resuid,
          description:
            '16-битное значение, используемое в качестве идентификатора пользователя по умолчанию для зарезервированных блоков.',
        },
        {
          name: 's_def_resgid',
          value: s.s_def_resgid,
          description:
            '16-битное значение, используемое в качестве идентификатора группы по умолчанию для зарезервированных блоков.',
        },
        {
          name: 's_first_ino',
          value: s.s_first_ino,
          description:
            '32-битное значение, используемое в качестве индекса для первого inode, используемого для стандартных файлов.',
        },
        {
          name: 's_inode_size',
          value: s.s_inode_size,
          description:
            '16-битное значение, указывающее размер структуры inode.',
        },
        {
          name: 's_block_group_nr',
          value: s.s_block_group_nr,
          description:
            '16-битное значение, используемое для указания номера группы блоков, в которой размещена эта структура суперблока.',
        },
        {
          name: 's_feature_compat',
          value: s.s_feature_compat,
          description: '32-битная битовая маска совместимых функций.',
        },
        {
          name: 's_feature_incompat',
          value: s.s_feature_incompat,
          description: '32-битная битовая маска несовместимых функций.',
        },
        {
          name: 's_feature_ro_compat',
          value: s.s_feature_ro_compat,
          description: '32-битная битовая маска функций «только для чтения»',
        },
        {
          name: 's_uuid',
          value: new Uint8Array(s.s_uuid),
          description:
            '128-битное значение, используемое в качестве идентификатора тома.',
        },
        {
          name: 's_volume_name',
          value: new Uint8Array(s.s_volume_name),
          description: '16-байтовое имя тома, в основном неиспользуемое.',
        },
        {
          name: 's_last_mounted',
          value: new Uint32Array(s.s_last_mounted),
          description:
            'Путь к каталогу длиной 64 байта, в котором в последний раз была смонтирована файловая система.',
        },
        {
          name: 's_algo_bitmap',
          value: s.s_algo_bitmap,
          description:
            '32-битное значение, используемое алгоритмами сжатия для определения используемых методов сжатия.',
        },
        {
          name: 's_prealloc_blocks',
          value: s.s_prealloc_blocks,
          description:
            '8-битное значение, представляющее количество блоков, которые реализация должна попытаться предварительно выделить при создании нового обычного файла.',
        },
        {
          name: 's_prealloc_dir_blocks',
          value: s.s_prealloc_dir_blocks,
          description:
            '8-битное значение, представляющее количество блоков, которые реализация должна попытаться предварительно выделить при создании нового каталога.',
        },
        {
          name: 's_journal_uuid',
          value: new Uint8Array(s.s_journal_uuid),
          description:
            '16-байтовое значение, содержащее uuid суперблока журнала.',
        },
        {
          name: 's_journal_inum',
          value: s.s_journal_inum,
          description: '32-битный номер инода файла журнала.',
        },
        {
          name: 's_journal_dev',
          value: s.s_journal_dev,
          description: '32-битный номер устройства файла журнала',
        },
        {
          name: 's_last_orphan',
          value: s.s_last_orphan,
          description:
            '32-битный номер индекса, указывающий на первый индекс в списке удаляемых индексов.',
        },
        {
          name: 's_hash_seed',
          value: new Uint32Array(s.s_hash_seed),
          description:
            'Массив из 4 32-битных значений, содержащих начальные значения, используемые для алгоритма хеширования для индексации каталогов.',
        },
        {
          name: 's_def_hash_version',
          value: s.s_def_hash_version,
          description:
            '8-битное значение, содержащее версию хэша по умолчанию, используемую для индексации каталогов.',
        },
        {
          name: 's_default_mount_options',
          value: s.s_default_mount_options,
          description:
            '32-битное значение, содержащее параметры монтирования по умолчанию для этой файловой системы.',
        },
        {
          name: 's_first_meta_bg',
          value: s.s_first_meta_bg,
          description:
            '32-битное значение, указывающее идентификатор группы блоков первой группы метаблоков.',
        },
      ]
    },
    active() {
      const a = this.$store.state.ext2.active
      const res = [
        {
          name: 'inode',
          value: a.inode,
          description: '32-битный индексный номер записи файла.',
        },
        {
          name: 'rec_len',
          value: a.rec_len,
          description:
            '16-битное смещение без знака к следующей записи каталога с начала текущей записи каталога.',
        },
        {
          name: 'name_len',
          value: a.name_len,
          description:
            '8-битное беззнаковое значение, указывающее, сколько байтов символьных данных содержится в имени.',
        },
        {
          name: 'file_type',
          value: a.file_type,
          description:
            '8-битное беззнаковое значение, используемое для указания типа файла.',
        },
        { name: 'name', value: a.name, description: 'Название записи.' },
        {
          name: 'i_mode',
          value: a.i_mode,
          description:
            '16-битное значение, используемое для указания формата описываемого файла и прав доступа.',
        },
        {
          name: 'i_uid',
          value: a.i_uid,
          description:
            '16-битный идентификатор пользователя, связанный с файлом.',
        },
        {
          name: 'i_size',
          value: a.i_size,
          description:
            'В версии 0 (со знаком) 32-битное значение, указывающее размер файла в байтах.',
        },
        {
          name: 'i_atime',
          value: new Date(a.i_atime).toLocaleString('ru-RU'),
          description:
            '32-битное значение, представляющее количество секунд с 1 января 1970 года, когда последний раз обращались к этому индексному узлу.',
        },
        {
          name: 'i_ctime',
          value: new Date(a.i_ctime).toLocaleString('ru-RU'),
          description:
            '32-битное значение, представляющее количество секунд с 1 января 1970 года, когда был создан индексный дескриптор.',
        },
        {
          name: 'i_mtime',
          value: new Date(a.i_mtime).toLocaleString('ru-RU'),
          description:
            '32-битное значение, представляющее количество секунд с 1 января 1970 года, когда этот индексный дескриптор был в последний раз изменен.',
        },
        {
          name: 'i_dtime',
          value: new Date(a.i_dtime).toLocaleString('ru-RU'),
          description:
            '32-битное значение, представляющее количество секунд с 1 января 1970 года, когда индексный дескриптор был удален.',
        },
        {
          name: 'i_gid',
          value: a.i_gid,
          description:
            '16-битное значение группы POSIX, имеющей доступ к этому файлу.',
        },
        {
          name: 'i_links_count',
          value: a.i_links_count,
          description:
            '16-битное значение, указывающее, сколько раз этот конкретный индекс был связан (упоминается)',
        },
        {
          name: 'i_blocks',
          value: a.i_blocks,
          description:
            '32-битное значение, представляющее общее количество 512-байтовых блоков, зарезервированных для хранения данных этого индексного дескриптора, независимо от того, используются эти блоки или нет.',
        },
        {
          name: 'i_flags',
          value: a.i_flags,
          description:
            '32-битное значение, указывающее, как реализация ext2 должна вести себя при доступе к данным для этого inode.',
        },
        {
          name: 'i_osd1',
          value: a.i_osd1,
          description: '32-битной значение, зависящее от  ОС.',
        },
        {
          name: 'i_block',
          value: a.i_block,
          description:
            '15 x 32-битных номеров блоков, указывающих на блоки, содержащие данные для этого inode.',
        },
        {
          name: 'i_generation',
          value: a.i_generation,
          description:
            '32-битное значение, используемое для указания версии файла (используется NFS).',
        },
        {
          name: 'i_file_acl',
          value: a.i_file_acl,
          description:
            '32-битное значение, указывающее номер блока, содержащего расширенные атрибуты.',
        },
        {
          name: 'i_dir_acl',
          value: a.i_dir_acl,
          description:
            'В версии 0 это 32-битное значение всегда равно 0. В версии 1 для обычных файлов это 32-битное значение содержит старшие 32 бита 64-битного размера файла.',
        },
        {
          name: 'i_faddr',
          value: a.i_faddr,
          description:
            '32-битное значение, указывающее расположение фрагмента файла.',
        },
        { name: 'Размер', value: a.size, description: '' },
      ]
      if (a.children?.length)
        res.push({
          name: 'Содержит',
          value: a.children?.length,
        })
      return res
    },
  },
  methods: {
    download() {
      this.$store.dispatch('ext2/exportFile');
    },
  },
}
</script>
